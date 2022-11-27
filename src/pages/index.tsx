import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "../app/interfaces";
import styles from "@styles/index.module.css";

export default function Home() {
  const [id, setId] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState<User>();
  const [update, setUpdate] = useState<boolean>(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!update) {
      axios.post("/api/users", { email, name, password }).then((res) => {
        console.log(res.data);
      });
    } else {
      axios
        .put(`/api/users/${id}`, { id, email, name, password })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  const listUsers = async () => {
    const rtaUsers = await axios.get("/api/users");
    setUsers(rtaUsers.data);
  };

  const handleDeletetUser = (id) => {
    axios.delete(`/api/users/${id}`).then((res) => {
      setUser(res.data);
    });
  };

  const handleGetUser = async (id) => {
    const user = await axios.get(`/api/users/${id}`);
    setUser(user.data);
  };

  const handleUpdateUser = async (id) => {
    const user = await axios.get(`/api/users/${id}`);
    setId(user.data?.id);
    setEmail(user.data?.email);
    setName(user.data?.name);
    setPassword(user.data?.password);
    setUpdate(true);
  };

  return (
    <div>
      <p>Home</p>
      <br />
      <br />
      <br />
      <div className={styles["background-user"]}>
        <div> {user?.id} </div>
        <div> {user?.name} </div>
        <div> {user?.password} </div>
        <div> {user?.email} </div>
      </div>
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Nombre</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit">{update ? "Actualizar" : "Guardar"}</button>
      </form>
      <br />
      <br />
      <br />
      <div className={styles["background-user-list"]}>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <div>
              {user?.email}
              <button onClick={() => handleGetUser(user?.id)}>Ver</button>
              <button onClick={() => handleDeletetUser(user?.id)}>Eli</button>
              <button onClick={() => handleUpdateUser(user?.id)}>Act</button>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
