import axios from 'axios'
import { useState } from 'react'

function AddEmployee() {

    const [name, setName] = useState('')
    const [surName, setSurname] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirthday, setDateOfBirthday] = useState('')
    const [post, setPost] = useState('')
    const [passportSerial, setPassportSerial] = useState('')
    const [passportNumber, setPassportNumber] = useState(0)
    const [inps, setInps] = useState("")
    const [file1Base64String, setFile1Base64String] = useState('');
    const [file2Base64String, setFile2Base64String] = useState('');
    const [file3Base64String, setFile3Base64String] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [modalErrorVisible, setModalErrorVisible] = useState(false);
    const [modalInfoInpsVisible, setModalInfoInpsVisible] = useState(false);

    let _files = []

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile1Base64String(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFile2Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile2Base64String(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFile3Change = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile3Base64String(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getData = async () => {

        if(passportNumber == "" || passportSerial == "" || dateOfBirthday == ""){

            setModalInfoInpsVisible(true);
            const interval = setInterval(() => {
                setModalInfoInpsVisible(false);
            }, 3000);
            return
        }
       
        try {
            setModalVisible(true);
            
            
            let responce = await axios.post('https://siyobzup.xyz/api/data/', { "pasSer": passportSerial, "pasNum": passportNumber, "pasDob": dateOfBirthday})
            if(responce.status == 200){
                let extractedData = responce.data;
                setName(extractedData['data']['firstName'])
                setSurname(extractedData['data']['surName'])
                setLastName(extractedData['data']['middleName'])
                setInps(extractedData['data']['personalNum'])
                console.log(extractedData);
            }else{

            }
        } catch (error) {
            setModalVisible(false)
            console.log(error);
        }
        setModalVisible(false)
    }

    const postData = async () => {
        if(name == '' || surName == '' || lastName == '' || post == '' || inps == '' || passportNumber == '' || passportNumber == 0 || dateOfBirthday == ''){
            setModalInfoVisible(true);
            const interval = setInterval(() => {
                setModalInfoVisible(false);
            }, 3000);
            //clearInterval(interval)
            return
        }

        try {
            setModalLoadingVisible(true);


            let responce = await axios.post('https://siyobzup.xyz/api/create/', { 
                "name":name,
                "surname":surName,
                "lastname":lastName,
                "post": post,
                "inps":inps,
                "pasport_serial": passportSerial,
                "passport_number":passportNumber,
                "files":_files,
                "dob":dateOfBirthday
             })

            
            if (responce.status == 200) {
                let extractedData = responce.data;
                setModalLoadingVisible(false);
                setModalSuccessVisible(true);
                const interval = setInterval(() => {
                    setModalSuccessVisible(false);
                }, 3000);
                // clearInterval(interval)
                setName("")
                setSurname("")
                setLastName("")
                setInps("")
                setPassportNumber("")
                setPassportSerial("")
                setInps("")
                setDateOfBirthday("")
            } else if(responce.status == 400) {
                setModalInfoVisible(true) 
            }else {
                setModalErrorVisible(true) 
            }
        } catch (error) {
            setModalLoadingVisible(false)
            console.log(error);
        }
        setModalLoadingVisible(false)
    }

    return (
        <div>
            {modalVisible && <Modal onClose={() => setModalVisible(false)} />}
            {modalLoadingVisible && <ModalLoading onClose={() => setModalVisible(false)} />}
            {modalSuccessVisible && <ModalSuccess onClose={() => setModalVisible(false)} />}
            {modalInfoVisible && <ModalInfo onClose={() => setModalVisible(false)} />}
            {modalErrorVisible && <ModalError onClose={() => setModalVisible(false)} />}
            {modalInfoInpsVisible && <ModalInpsInfo onClose={() => setModalVisible(false)} />}

            <div class="form-container">
                <input type="text" id="firstname" name="firstname" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Имя" />
                <input type="text" id="lastname" name="lastname" onChange={(e) => setSurname(e.target.value)} value={surName} placeholder="Фамилия" />
                <input type="text" id="patronymic" name="patronymic" onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Отчество" />
                <input type="text" id="position" name="position" onChange={(e) => setPost(e.target.value)} value={post} placeholder="Должность" />

                <div class="row">
                    <input type='date' id='dateBirthDay' onChange={(e)=>{
                        let a = e.target.value.split('-').join('');
                        setDateOfBirthday(a)
                    }}/>
                    <input type="text" id="passport-series" onChange={(e)=>setPassportSerial(e.target.value)} name="passport-series" placeholder="Серия паспорта" />
                    <input type="text" id="passport-number" onChange={(e) => setPassportNumber(e.target.value)} name="passport-number" placeholder="Номер паспорта" /> 
                </div>
                <input type="text" id="inps" onChange={(e) => setInps(e.target.value)} value={inps} name="inps" placeholder="ИНПС" />
                <button type="button" onClick={() => getData()} class="inps-button">Определить ИНПС</button>
                <div class="file_select">
                    
                    <label for="file-input">CV</label>
                    <input type="file" id="file" name="file" onChange={handleFileChange} />
                    <label for="file-input">Заявление</label>
                    <input type="file" id="file" name="file" onChange={handleFile2Change} />
                    <input type="file" id="file" name="file" onChange={handleFile3Change} />

                </div>

                <button type="submit" class="submit-button" onClick={() => postData()}>Отправить</button>
            </div>

            {/* <div id="modal" class="modal">
                                                <div class="modal-content">
                                                    <span class="close-button">&times;</span>
                                                    <p>Успешно</p>
                                                    <span class="checkmark">✓</span>
                                                </div>
                                            </div> */}
        </div>
    )
}


const Modal = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'red',
            padding: '10px',
            color: "white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Загрузка</p>
        </div>
    );
};

const ModalSuccess = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'green',
            padding: '10px',
            color: "white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Документ успешно создался</p>
        </div>
    );
};

const ModalLoading = ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'orange',
            padding: '10px',
            color: "white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Загрузка</p>
        </div>
    );
};

const ModalInfo= ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'orange',
            padding: '10px',
            color: "white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Заполнены не все поля</p>
        </div>
    );
};

const ModalInpsInfo= ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'orange',
            padding: '10px',
            color: "white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Необходимо заполнить номер и серию паспорта и дату рождения</p>
        </div>
    );
};

const ModalError= ({ onClose }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'red',
            padding: '10px',
            color: "white",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Произошла ошибка сервера</p>
        </div>
    );
};


export default AddEmployee