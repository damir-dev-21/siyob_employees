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
            setModalInfoVisible(true)
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
                "files":_files
             })
            if (responce.status == 200) {
                let extractedData = responce.data;
                setModalLoadingVisible(false);
                const interval = setInterval(() => {
                    setModalVisible(false);
                }, 3000);
                clearInterval(interval)

                console.log(extractedData);
            } else {

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

            <div class="form-container">
                <input type="text" id="firstname" name="firstname" value={name} placeholder="Имя" />
                <input type="text" id="lastname" name="lastname" value={surName} placeholder="Фамилия" />
                <input type="text" id="patronymic" name="patronymic" value={lastName} placeholder="Отчество" />
                <input type="text" id="position" name="position" placeholder="Должность" />

                <div class="row">
                    <input type='date' id='dateBirthDay' onChange={(e)=>{
                        let a = e.target.value.split('-').join('');
                        setDateOfBirthday(a)
                    }}/>
                    <input type="text" id="passport-series" onChange={(e)=>setPassportSerial(e.target.value)} name="passport-series" placeholder="Серия паспорта" />
                    <input type="text" id="passport-number" onChange={(e) => setPassportNumber(e.target.value)} name="passport-number" placeholder="Номер паспорта" /> 
                </div>
                <input type="text" id="inps" value={inps} name="inps" placeholder="ИНПС" />
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
            <p>Загрузка, получение данных</p>
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
            backgroundColor: 'red',
            padding: '10px',
            color: "green",
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
            backgroundColor: 'red',
            padding: '10px',
            color: "orange",
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
            backgroundColor: 'red',
            padding: '10px',
            color: "orange",
            zIndex: 1000,
            borderRadius: '10px'
        }}>
            <p>Заполнены не все поля</p>
        </div>
    );
};


export default AddEmployee