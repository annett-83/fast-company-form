import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "../common/form/multySelectField";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Edit = () => {
    const { userId } = useParams();
    const history = useHistory();
    // console.log(params);
    // console.log(userId);
    const [data, setData] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        if (userId) {
            api.users.getById(userId).then((data) => {
                if (data) {
                    const newdata = {};
                    newdata.name = data.name;
                    newdata.email = data.email;
                    newdata.sex = data.sex;
                    newdata.profession = data.profession._id;
                    newdata.qualities = data.qualities.map((q) => {
                        return { value: q._id, label: q.name };
                    });
                    console.log(newdata.qualities);
                    setData(newdata);
                }
            });
        }
    }, []);

    const handeleChange = (target) => {
        // console.log(target);
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
    const handeleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const ndata = {};
        ndata.name = data.name;
        ndata.email = data.email;
        ndata.sex = data.sex;
        const profession = {
            _id: data.profession
        };
        for (const key of Object.keys(professions)) {
            if (professions[key]._id === profession._id) {
                profession.name = professions[key].name;
                break;
            };
        };
        ndata.profession = profession;
        ndata.qualities = [];
        for (const q of data.qualities) {
            for (const key of Object.keys(qualities)) {
                if (qualities[key]._id === q.value) {
                    ndata.qualities.push(qualities[key]);
                    break;
                }
            }
        }
        console.log(data);
        console.log(ndata);
        api.users.update(userId, ndata);
        history.goBack();
    };
    if (data) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handeleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handeleChange}
                                error={errors.name}
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
                                onClick={handeleSubmit}
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div> Loading... </div>;
    }
};
Edit.propTypes = {
    userId: PropTypes.string
};
export default Edit;
