import { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import DefaultPage from '../components/DefaultPage';
import FormCreateNewUser from '../components/FormCreateNewUser';
import Header from '../components/Header';
import ListUser from '../components/ListUser';
const Home = () => {
    const auth = useSelector((state) => state.auth.login.dataUser.user_id)
    const isAdmin = useSelector((state) => state.auth.login.dataUser.user_isAdmin)
    const navigate = useNavigate()

    const [openForm, setOpenForm] = useState(false)
    if (!auth)
        setTimeout(() => {
            navigate("/login")
        }, 0)
    return (
        <DefaultPage>
            {/* <Link to="/upload">Upload File</Link> */}
            <Header></Header>
            {isAdmin === 1 ? (
                <button onClick={() => setOpenForm(!openForm)}>Add User</button>
            ) : ""}
            <ListUser></ListUser>
            {openForm ? (
                <FormCreateNewUser></FormCreateNewUser>
            ) : ""}
        </DefaultPage>
    );
};

export default Home;