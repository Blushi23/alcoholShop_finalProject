import { FunctionComponent, useContext, useEffect, useState } from "react";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { siteTheme } from "../App";
import { deleteUser, getUsers, updateUserRole } from "../services/usersService";
import { successMsg } from "../services/feedbackService";

interface UsersManagmentProps {
    handleUpdateUser: Function;
    users: User[];
    setUsers: Function;
}

const UsersManagment: FunctionComponent<UsersManagmentProps> = ({ handleUpdateUser, users, setUsers }) => {
    let navigate = useNavigate();
    let theme = useContext(siteTheme);
    let [dataChanged, setDataChanged] = useState<boolean>(false);

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err));
    }, [dataChanged, setUsers])

    let handleToDelete = async (id: string) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteUser(id);
                successMsg("User deleted successfully");
                setDataChanged(!dataChanged);
            } catch (error) {
                console.log(error);

            }
        }
    }

    return (
        <>
            <div className="container">
                <h3>Users Managment</h3>
                {users.length ? (
                    <table className="table text-center" data-bs-theme={`${theme}`} >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map((user: User) => (
                                <tr key={user.email}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td><select
                                        name="role"
                                        id="role"
                                        value={user.isAdmin ? 'admin' : 'user'}

                                    >
                                        <option value="user">User</option><option value="admin">Admin</option></select></td>
                                    <td><i className="fa-solid fa-user-pen text-warning" onClick={() => navigate(`/update-account/${user._id}`)}></i></td>
                                    <td>
                                        <i className="fa-solid fa-user-xmark text-danger" onClick={() => handleToDelete(user._id as string)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                ) : (<p>No users found</p>)}
            </div >        </>
    )
}

export default UsersManagment;