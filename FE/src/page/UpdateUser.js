import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const UpdateUser = () => {
    const notify = (type, strings) => {
        switch (type) {
            case 200:
                toast.success(strings, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;
            default:
                toast.error(strings, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                break;
        }

    };

    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    let idUser = (window.location.pathname).split("/")[3]

    useEffect(() => {
        const getDetailUser = async () => {
            const res = await axios.get(`http://localhost:7070/detail/user/${idUser}`)
            setFname(res.data.user_firstName)
            setLname(res.data.user_lastName)
            setEmail(res.data.user_email)
            setPhone(res.data.user_phone)
        }
        getDetailUser()
    }, [])

    const handleUpdateUser = (e) => {
        e.preventDefault()
        const userInfo = {
            user_firstName: fname,
            user_lastName: lname,
            user_email: email,
            user_phone: phone,
            user_id: idUser
        }
        const updateUser = async () => {
            const res = await axios.post(`http://localhost:7070/update-user`, { userInfo })
            if (res.status === 200) {
                notify(200, "Cập nhật user thành công")
                setFname(res.data.user_firstName)
                setLname(res.data.user_lastName)
                setEmail(res.data.user_email)
                setPhone(res.data.user_phone)
            }
        }
        updateUser()
    }
    return (
        <div>
            {
                fname ? (
                    <form >
                        <label htmlFor="fname">First Name</label>
                        <input type="text" id="fname" name="firstname" value={fname} onChange={(e) => setFname(e.target.value)} />
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" value={lname} onChange={(e) => setLname(e.target.value)} />
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input type="submit" value="Submit" onClick={handleUpdateUser} />
                    </form>
                ) :
                    "loading"}
            <ToastContainer />

        </div>
    );
};

export default UpdateUser;