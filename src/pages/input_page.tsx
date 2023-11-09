import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InputPage = () => {
  const [inputs, setInput] = useState([]);

  useEffect(() => {
    getInputs();
  }, []);

  const goBack = () => {
    window.location.href = "/input-page";
  };

  const getInputs = async () => {
    const response = await axios.get("http://localhost:8080/api/input");
    setInput(response.data);
  };

  const deleteInput = async (id: any) => {
    try {
      await axios.delete(`http://localhost:8080/api/input/${id}`);
      getInputs();
    } catch (error) {
      console.log(error);
    }
  };

  const editInput = async (id: any) => {
    window.location.href = `/input/edit/${id}`;
  };

  interface Input {
    ID: number;
    username: string;
    email: string;
    password: string;
  }

  return (
    <div className="container-fluid">
      <div className="container bg-light px-5">
        <div className="columns mt-5 is-centered">
          <div className="column is-half table-responsive text-nowrap">
            <div className="mt-5">
              <h1
                className="text-center fw-semibold"
                style={{ color: "#A20404" }}
              >
                List Input
              </h1>
              <div className="mt-5">
                <Link to={`add`}>
                  <button className="btn btn-primary" style={{ width: 120 }}>
                    Add Input
                  </button>
                </Link>
                <Link onClick={goBack} className="ms-2" to={""}>
                  <button className="btn btn-secondary" style={{ width: 120 }}>
                    Back
                  </button>
                </Link>
              </div>
            </div>
            <table className="table table-bordered text-center mb-5 mt-4">
              <thead>
                <tr>
                  <th
                    className="col-1"
                    style={{ backgroundColor: "#A20404", color: "white" }}
                  >
                    No
                  </th>
                  <th
                    className="col-3"
                    style={{ backgroundColor: "#A20404", color: "white" }}
                  >
                    Username
                  </th>
                  <th
                    className="col-3"
                    style={{ backgroundColor: "#A20404", color: "white" }}
                  >
                    Email
                  </th>
                  <th
                    className="col-3"
                    style={{ backgroundColor: "#A20404", color: "white" }}
                  >
                    Password
                  </th>
                  <th
                    className="col-2"
                    style={{ backgroundColor: "#A20404", color: "white" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              {inputs.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={5}>Data Input Kosong</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {inputs.map((input: Input, index: number) => (
                    <tr
                      key={input.ID}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#F2F2F2" : "white",
                      }}
                    >
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">{input.username}</td>
                      <td className="align-middle">{input.email}</td>
                      <td className="align-middle">{input.password}</td>
                      <td>
                        <button
                          onClick={() => editInput(input.ID)}
                          style={{ width: 70 }}
                          className="btn btn-success"
                        >
                          Edit
                        </button>
                        <span> </span>
                        <button
                          onClick={() => deleteInput(input.ID)}
                          style={{ width: 70 }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
