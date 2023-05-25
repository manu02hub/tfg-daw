import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { PeticionAJAX } from "../../helpers/PeticionAJAX";
import { BsPersonFillAdd } from "react-icons/bs";
import CardUser from "../../components/user/CardUser";
import useAuth from "../../hooks/useAuth";
import CardShowUser from "../../components/user/CardShowUser";
import HeaderSection from "../../components/HeaderSection";
import Spinner from "../../components/Spinner";
import TabsUser from "../../components/user/TabsUser";
import Search from "../../components/Search";
import BtnAdd from "../../components/BtnAdd";
import { checkPermission } from "../../helpers/CheckPermissions";

function IndexUser() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const [show, setShow] = useState(false);
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    if(auth && checkPermission(auth.permissions, "gestion-clinic-user")){
      getUsersClinic();
    }
  }, []);

  const getUsersClinic = async () => {
    const { datos, cargando } = await PeticionAJAX(
      Global.url + "user/getUsers-clinic/" + auth._id + "/" + auth.id_clinic,
      "GET"
    );


    if (datos.state == "success" && !cargando) {
      setUsers(datos.allUsers);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}

      <HeaderSection title={"Usuarios"}>
        <div className="headerSearch">
          <Search />
          <BtnAdd to={"/panel/users/user-create"} add={"Añadir Usuario"}>
            <BsPersonFillAdd></BsPersonFillAdd>
          </BtnAdd>
        </div>
      </HeaderSection>

      {auth && checkPermission(auth.permissions, "gestion-admin-user") && (
        <TabsUser
          auth={auth}
          usuarios={setUsers}
          loading={setLoading}
          showUser={setShow}
        />
      )}

      {!loading && (
        <>
          {show && <CardShowUser id_user={idUser}></CardShowUser>}

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
