import React from "react";

function EditUser() {
  return (
    <>
      <div className="headerSection">
        <div className="headerName">
          <h3>Profile</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="cardComponent shadow">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Profile information</h2>
                  <p>
                    Update your account's profile information and email address.
                  </p>
                  <form className="formEdit">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue="Manuel Alonso Martín"
                    ></input>

                    <div className="separadorForm">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue="manuel@gmail.com"
                      ></input>
                    </div>
                    <div className="separadorBtn">
                      <input
                        type="submit"
                        className="btnsColor"
                        value={"Save"}
                      ></input>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="cardComponent shadow">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Update password</h2>
                  <p>
                    Ensure your account is using a long, random password to stay
                    secure.
                  </p>
                  <form className="formEdit">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="current"
                      defaultValue="aaaaaaaaa"
                    ></input>

                    <div className="separadorForm">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        defaultValue="aaaaaaaaa"
                      ></input>
                    </div>

                    <div className="separadorForm">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        defaultValue="aaaaaaaaa"
                      ></input>
                    </div>
                    <div className="separadorBtn">
                      <input
                        type="submit"
                        className="btnsColor"
                        value={"Save"}
                      ></input>
                    </div>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="cardComponent shadow">
            <div className="row">
              <div className="col-sm-12 col-md-10 col-lg-8">
                <section className="section-card">
                  <h2>Delete Account</h2>
                  <p>
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                  </p>
                  <div className="separadorBtn">
                    <button className="btnDelete">Delete Account</button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUser;
