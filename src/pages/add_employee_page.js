import { useState } from 'react'

function AddEmployee() {

    const [name, setName] = useState('')
    const [surName, setSurname] = useState('')
    const [lastName, setLastName] = useState('')
    const [post, setPost] = useState('')
    const [passportSerial, setPassportSerial] = useState('')
    const [passportNumber, setPassportNumber] = useState(0)
    const [inps, setInps] = useState("")
    const [file1Base64String, setFile1Base64String] = useState('');
    const [file2Base64String, setFile2Base64String] = useState('');
    const [file3Base64String, setFile3Base64String] = useState('');

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



    return (
        <div>
            <div class="form-container">
                <input type="text" id="firstname" name="firstname" placeholder="Имя" />
                <input type="text" id="lastname" name="lastname" placeholder="Фамилия" />
                <input type="text" id="patronymic" name="patronymic" placeholder="Отчество" />
                <input type="text" id="position" name="position" placeholder="Должность" />

                <div class="row">
                    <input type="text" id="passport-series" name="passport-series" placeholder="Серия паспорта" />
                    <input type="text" id="passport-number" name="passport-number" placeholder="Номер паспорта" />
                </div>
                <input type="text" id="inps" name="inps" placeholder="ИНПС" />
                <button type="button" class="inps-button">Определить ИНПС</button>
                <div class="file_select">
                    
                    <label for="file-input">CV</label>
                    <input type="file" id="file" name="file" onChange={handleFileChange} />
                    <label for="file-input">Заявление</label>
                    <input type="file" id="file" name="file" onChange={handleFile2Change} />
                    <input type="file" id="file" name="file" onChange={handleFile3Change} />

                </div>

                <button type="submit" class="submit-button" onClick={() => { console.log(file1Base64String); }}>Отправить</button>
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

export default AddEmployee