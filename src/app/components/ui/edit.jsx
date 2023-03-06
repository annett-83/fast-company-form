import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "../common/form/multySelectField";

const Edit = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handeleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Необходимо ввести имя"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почт обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почт введена не корректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const hendeleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={hendeleSubmit}>
            <TextField
                label="Имя"
                type="Имя"
                name="Имя"
                value={data.name}
                onChange={handeleChange}
                error={errors.password}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handeleChange}
                error={errors.email}
            />
            <SelectField
                label="Выберите вашу профессию"
                onChange={handeleChange}
                options={professions}
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handeleChange}
                label="Выбурите ваши пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={handeleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выбурите ваши качества"
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Обновить
            </button>
        </form>
    );
};
export default Edit;
