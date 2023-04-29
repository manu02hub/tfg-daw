import React, { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import CardUser from "../../components/user/CardUser";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import CardShowUser from "../../components/user/CardShowUser";
import HeaderSection from "../../components/HeaderSection";
import Spinner from "../../components/Spinner";
import TabsUser from "../../components/user/TabsUser";

function IndexUser() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState(0);

  return (
    <>
      {loading && <Spinner />}

      <HeaderSection title={"Usuarios"}>
        <div className="headerSearch">
          <form>
            <input
              type="search"
              placeholder="Search... "
              className="inputSearch"
            ></input>
            <Link to={"/panel/users/user-create"} className="btnAdd">
              <BsPersonFillAdd></BsPersonFillAdd>
              <span>Add User</span>
            </Link>
          </form>
        </div>
      </HeaderSection>

      <TabsUser auth={auth} usuarios={setUsers} loading={setLoading} showUser={setShow} />

      {!loading && (
        <>
          {show && <CardShowUser id_user={idUser} ></CardShowUser>}

          <div className="row">
            {users.map((user) => {
              return (
                <CardUser
                  key={user._id}
                  userInfo={user}
                  showCard={setShow}
                  setId={setIdUser}
                  users={users}
                  setUsers={setUsers}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default IndexUser;
