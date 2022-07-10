import React from 'react';
import s from "./header.module.css";
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.section}>
                <div className={s.item}>
                    <NavLink to="/profile"
                             className={pressed => pressed ? s.active : s.link}>Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/register"
                             className={pressed => pressed ? s.active : s.link}>Register</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/test"
                             className={pressed => pressed ? s.active : s.link}>Test</NavLink>
                </div>
            </div>
            <div className={s.section}>
                <div className={s.item}>
                    <NavLink to="/login"
                             className={pressed => pressed ? s.active : s.link}>Log in</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/recoveryPassword"
                             className={pressed => pressed ? s.active : s.link}>Forgot Password?</NavLink>
                </div>
            </div>
        </div>
    );
};
