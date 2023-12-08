import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import fire from "../files/firebase";

export const Adminpage = () => {
  const history = useHistory();
  const location = useLocation();

  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const [moviedata, setmoviedata] = useState([]);

  useEffect(() => {
    fire.firestore().collection("currentmovies").get().then(snapshot => {
      snapshot.forEach(doc => {
        var data = doc.data();
        var id = doc.id;
        setmoviedata(arr => [...arr, { id: id, data: data }]);
      });
    });
    console.log(moviedata);
  }, []);
  return (
    <div className="wrapper ">
      <link
        href="../assets/css/material-dashboard.css?v=2.1.2"
        rel="stylesheet"
      />
      <div
        className="sidebar"
        data-color="purple"
        data-background-color="white"
        data-image="../assets/img/sidebar-1.jpg"
      >
        <div className="logo">
          <a
            href="http://www.creative-tim.com"
            className="simple-text logo-normal"
          >
            AMC CINEMAS
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active  ">
              <Link
                to={{
                  pathname: "/adminpage",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">home</i>
                <p>Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={{
                  pathname: "/movieupload",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">dashboard</i>
                <p>Movie Upload</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/adminbooking",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">content_paste</i>
                <p>Retrieve Bookings</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/adminprofile",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">person</i>
                <p>User Profile</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/retrievefeedback",
                  state: {
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">notifications</i>
                <p>Feedback</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="" className="nav-link">
                <i className="material-icons">logout</i>
                <p>Logout</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-panel">
        <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
          <div class="container-fluid">
            <div class="navbar-wrapper" />
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="navbar-toggler-icon icon-bar" />
              <span class="navbar-toggler-icon icon-bar" />
              <span class="navbar-toggler-icon icon-bar" />
            </button>
          </div>
        </nav>

        <div className="row" style={{ gap: "20px", marginLeft: "280px" }}>
          {moviedata.map((data, index) => {
            //console.log(data.image);
            return (
              <div
                key={
                  index // className="col-4"
                }
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                <div
                  className="card"
                  style={{ width: "fit-content", borderRadius: "20px" }}
                >
                  <div className="card-img-top img-fluid">
                    <img
                      src={data.data.image}
                      style={{
                        width: "18rem",
                        height: "20rem",
                        borderRadius: "10px 10px 0px 0px"
                      }}
                    />
                  </div>
                  <button
                    onClick={() =>
                      history.push({
                        pathname: "/updatemovie",
                        state: {
                          id: data.id,
                          image: data.data.image,
                          viedourl: data.data.viedourl,
                          moviename: data.data.moviename,
                          ticketcost: data.data.ticketcost,
                          description: data.data.description,
                          actorname: data.data.actorname,
                          directorname: data.data.directorname,
                          releasedate: data.data.releasedate,
                          outdate: data.data.outdate,
                          offer: data.data.offer,
                          profile: profile,
                          name: name,
                          email: email,
                          password: password,
                          mobile: mobile
                        }
                      })}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      fire
                        .firestore()
                        .collection("currentmovies")
                        .where("moviename", "==", data.data.moviename)
                        .get()
                        .then(doc => doc.docs[0].ref.delete());
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
