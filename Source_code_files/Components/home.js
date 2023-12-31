import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import fire from "../files/firebase";
import "../movie_details.css";

export const Homepage = () => {
  const history = useHistory();
  const location = useLocation();
  var id = location.state.id;
  const profile = location.state.profile;
  const name = location.state.name;
  const email = location.state.email;
  const password = location.state.password;
  const mobile = location.state.mobile;
  const premium = location.state.premium;
  const [moviedata, setmoviedata] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  // alert(id);

  useEffect(() => {
    fire.firestore().collection("currentmovies").get().then(snapshot => {
      snapshot.forEach(doc => {
        var data = doc.data();
        //console.log(data);
        setmoviedata(arr => [...arr, { data: data }]);
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
                  pathname: "/homepage",
                  state: {
                    id: id,
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                    premium: premium
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
                  pathname: "/dashboard",
                  state: {
                    id: id,
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                    premium: premium
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/bookings",
                  state: {
                    id: id,
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                    premium: premium
                  }
                }}
                className="nav-link"
              >
                <i className="material-icons">content_paste</i>
                <p>Bookings</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                to={{
                  pathname: "/userprofile",
                  state: {
                    id: id,
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                    premium: premium
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
                  pathname: "/feedback",
                  state: {
                    id: id,
                    profile: profile,
                    name: name,
                    email: email,
                    password: password,
                    mobile: mobile,
                    premium: premium
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
        <div
          style={{
            width: "40%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "100px"
          }}
        >
          <input
            type="text"
            placeholder="Search By movie name..."
            value={searchkey}
            onChange={e => setsearchkey(e.target.value)}
          />
        </div>
        <div className="row" style={{ gap: "20px", marginLeft: "280px" }}>
          {moviedata
            .filter(data => {
              if (
                data.data.moviename
                  .toLowerCase()
                  .includes(searchkey.toLowerCase()) ||
                data.data.moviename
                  .toUpperCase()
                  .includes(searchkey.toUpperCase())
              ) {
                return data;
              }
            })
            .map((data, index) => {
              //console.log(data.image);
              return (
                <div // className="col-4"
                  key={index}
                >
                  <div
                    className="card"
                    style={{
                      width: "fit-content",
                      borderRadius: "20px"
                    }}
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
                      style={{ borderRadius: "3px" }}
                      onClick={() =>
                        history.push({
                          pathname: "/details",
                          state: {
                            viedourl: data.data.viedourl,
                            moviename: data.data.moviename,
                            description: data.data.description,
                            actorname: data.data.actorname,
                            directorname: data.data.directorname,
                            releasedate: data.data.releasedate,
                            outdate: data.data.outdate
                          }
                        })}
                    >
                      View Details
                    </button>
                    <button
                      style={{ borderRadius: "3px" }}
                      onClick={() =>
                        history.push({
                          pathname: "/bookingform",
                          state: {
                            releasedate: data.data.releasedate,
                            outdate: data.data.outdate,
                            movieimage: data.data.image,
                            moviename: data.data.moviename,
                            ticketcost: data.data.ticketcost,
                            profile: profile,
                            name: name,
                            email: email,
                            password: password,
                            mobile: mobile,
                            premium: premium,
                            offer: data.data.offer,
                            id: id
                          }
                        })}
                    >
                      Book Now
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
