import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const ViewAccount = ({ isAuthenticated, setIsAuthenticated }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showPasswordChangeConfirmation, setShowPasswordChangeConfirmation] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState('');

    const REACT_APP_BACKEND = process.env.REACT_APP_BACKEND;


    useEffect(() => {
        const fetchAccountInfo = async () => {

            const access_token = localStorage.getItem('access_token');

            axios
                .get(`${REACT_APP_BACKEND}/account`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((res) => {
                    setUser(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log('Error fetching account information:', err);
                    setLoading(false);
                    console.log(isAuthenticated);
                    console.log(user);
                    console.log(localStorage.getItem('access_token'));
                });
        };

        fetchAccountInfo();
    },);


    const handleDeleteAccount = () => {
        setShowPasswordChangeConfirmation(false);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        const access_token = localStorage.getItem("access_token");

        axios
            .delete(`${REACT_APP_BACKEND}/account`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                console.log(res.data.message);
                localStorage.removeItem('access_token');
                setIsAuthenticated(false);
                navigate("/login");
            })
            .catch((err) => {
                console.log("Error deleting account:", err);
            });
    };

    const handleChangePassword = () => {
        setShowDeleteConfirmation(false);
        setShowPasswordChangeConfirmation(true);
    };

    const handleConfirmPasswordChange = async () => {
        if (newPassword.length < 5) {
            setPasswordChangeError("Password must be at least 5 characters long.");
            return;
        }
        const access_token = localStorage.getItem('access_token');
        const data = {
            old_password: oldPassword,
            new_password: newPassword,
        }

        axios
            .post(`${REACT_APP_BACKEND}/changepassword`, data, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((res) => {
                console.log(res.data.message);
                setShowPasswordChangeConfirmation(false);
                setOldPassword("");
                setNewPassword("");
                setPasswordChangeError("");
            })
            .catch((err) => {
                setPasswordChangeError('Invalid old password');
                console.log('Error changing password:', err);
            });
    };


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        console.log(isAuthenticated);
    };


    return (
        <div className="ViewAccount-Page">
            <h2>View Account Page</h2>
            {loading ? (
                <div className="ViewAccount-Loading">Loading...</div>
            ) : (
                <div>
                    {!isAuthenticated ? (
                        <div className="ViewAccount-Login">
                            <p>Please log in to view your account.</p>
                            <Link to={'/login'}>Login</Link>
                        </div>
                    ) : (
                        <div>
                            {user ? (
                                <div className="ViewAccount-Content">
                                    <p className="ViewAccount-Greeting">Hello, {user.name}!</p>
                                    <p className="ViewAccount-Username">Username: {user.username}</p>
                                    <button className="ViewAccount-Logout" onClick={handleLogout}>Logout</button>
                                    <button className="ViewAccount-Password" onClick={handleChangePassword}>Change Password</button>
                                    <button className="ViewAccount-Delete" onClick={handleDeleteAccount}>Delete Account</button>
                                    {showPasswordChangeConfirmation && (
                                        <div>
                                            <p>Please enter your current password and new password</p>
                                            {passwordChangeError && <p>{passwordChangeError}</p>}
                                            <label>
                                                Current Password:<input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                            </label>
                                            <label>
                                                New Password:<input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                            </label>
                                            <button onClick={handleConfirmPasswordChange}>Submit</button>
                                            <button onClick={() => { setShowPasswordChangeConfirmation(false); setPasswordChangeError(null); }}>Cancel</button>
                                        </div>
                                    )}
                                    {showDeleteConfirmation && (
                                        <div>
                                            <p>Are you sure you want to delete your account?</p>
                                            <button onClick={handleConfirmDelete}>Yes</button>
                                            <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="ViewAccount-Error">No account information available.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewAccount;
