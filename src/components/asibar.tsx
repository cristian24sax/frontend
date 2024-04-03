"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import "./navbar.css";

const AsideBar = () => {
  const { data: session } = useSession();

  return (
    <aside id="sidebar">
      <div className="d-flex">
        <button className="toggle-btn" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#FFFFFF">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13H11v6.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7H7.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H10V4.5c0-.41.34-.75.75-.75s.75.34.75.75V6zm3.75 3.75c-.41 0-.75-.34-.75-.75V7h-2.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H14v-1.5c0-.41.34-.75.75-.75s.75.34.75.75V5h1.25c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75z" />
          </svg>
        </button>
        <div className="sidebar-logo">CodzSword</div>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M21 15.56V8.44c0-.4-.24-.77-.62-.92l-4-1.71-1.79 4 1.79 4 4-1.71c.38-.16.62-.53.62-.93zM12 17.35l-4 1.71V18l-2 .86V16l2-.86V9.14l-2 .86V8l4-1.71 4 1.71-4 1.71 4 1.71 1.79-4-1.79-4-4 1.71c-.38.16-.62.53-.62.93v7.12l4-1.71v1.21l-2 .86v1.14l2-.86v1.21l-4 1.71zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 18c-4.41 0-8-3 10-3s5.59 2.69 10 3c0-5.53-4.47-10-10-10zm0 16c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>

            <span>Profile</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M17 8v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2zm-3.5 4.5l-4.5 3.5V9l4.5 3.5z" />
            </svg>

            <span>Task</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M17.66 5.66L7.93 15.39a4.005 4.005 0 0 0 5.66 5.66l9.73-9.73a2.998 2.998 0 0 0 0-4.24l-1.42-1.42a2.996 2.996 0 0 0-4.24 0l-8.48 8.48a1 1 0 0 1-1.41-1.41l8.48-8.48a.996.996 0 0 1 1.41 0l1.41 1.41a.999.999 0 0 1 0 1.41l-9.73 9.73a4.005 4.005 0 0 1-5.66-5.66l9.73-9.73c.39-.39 1.02-.39 1.41 0l1.42 1.42c.39.39.39 1.02 0 1.41l-1.41 1.41c-.38.38-1.02.38-1.41 0L4.5 7.07a2.998 2.998 0 0 1 0-4.24l1.42-1.42a3.003 3.003 0 0 1 4.24 0l9.73 9.73z" />
            </svg>

            <span>Auth</span>
          </a>
          <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                Login
              </a>
            </li>
            <li className="sidebar-item">
              <a href="#" className="sidebar-link">
                Register
              </a>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>

            <span>Multi Level</span>
          </a>
          <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li className="sidebar-item">
              <a href="#" className="sidebar-link collapsed link" data-bs-toggle="collapse" data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                Two Links
              </a>
              <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    Link 1
                  </a>
                </li>
                <li className="sidebar-item">
                  <a href="#" className="sidebar-link">
                    Link 2
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 13H5v-2h14v2z" />
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.31 4.32L17 6l-4 4-3.98-3.99L6 9l-2-2 7.01-7L15.31 4.32zM22 17c0 1.1-.9 2-2 2H4c-1.1 0-1.99-.9-1.99-2L2 7c0-5.33 10-5 10-5s10-.33 10 5l-.01 10z" />
            </svg>

            <span>Notification</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="#" className="sidebar-link">
            <span>Setting</span>
          </a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="#" className="sidebar-link">
          <i className="lni lni-exit"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};
export default AsideBar;
