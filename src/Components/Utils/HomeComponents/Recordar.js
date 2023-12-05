import React, { useState, useEffect } from "react";
import { Modal, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Recordar = () => {
  const urlVerifyEmail = "http://localhost:8080/api/users/findUserByMail/";
  const urlSendCode = "http://localhost:8080/api/users/sendAuthCode/";
  const urlUpdatePassword = "http://localhost:8080/api/users/";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userCode, setVerificationCode] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePasswordModalIsOpen, setUpdatePasswordModalIsOpen] =
    useState(false);
  const [user, setUser] = useState(null);
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const value = e.target.value;

    if (!emailPattern.test(value)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError("");
    }

    setEmail(value);
  };

  const verifyEmail = async () => {
    try {
      const response = await fetch(urlVerifyEmail + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
        sendCode();
        setModalIsOpen(true);
      } else {
        throw new Error("Correo no registrado");
      }
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  const sendCode = async () => {
    try {
      const codeResponse = await fetch(urlSendCode + email, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (codeResponse.status === 200) {
        const code = await codeResponse.json();
        setCode(code.authCode);
      } else {
        throw new Error("Error al enviar el código");
      }
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleVerificationCodeMatch = () => {
    if (userCode === code) {
      alert("Código verificado correctamente");
      setModalIsOpen(false);
      setUpdatePasswordModalIsOpen(true);
    } else {
      alert("Código incorrecto. Por favor, inténtelo de nuevo.");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(urlUpdatePassword + user.userId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, contrasena: newPassword }),
      });

      if (response.status === 200) {
        alert("Contraseña actualizada correctamente");
        setUpdatePasswordModalIsOpen(false);
        navigate("/Ingresar");
      } else {
        throw new Error("Error al actualizar la contraseña");
      }
    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (newPassword === "" && confirmPassword === "") {
      setPasswordError("");
    } else {
      if (newPassword === confirmPassword) {
        setPasswordError("Confirmación ok!");
      } else {
        setPasswordError("Las contraseñas no coinciden");
      }
    }
  }, [newPassword, confirmPassword]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Email:</Card.Title>
          <Form.Group>
            <Form.Control
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <Form.Text className="text-danger">{emailError}</Form.Text>
            )}
          </Form.Group>
          <Button className="mt-3" variant="primary" onClick={verifyEmail}>
            Enviar código
          </Button>
        </Card.Body>
      </Card>

      <Modal show={modalIsOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingrese el código:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Código:</Form.Label>
            <Form.Control
              type="text"
              value={userCode}
              onChange={(e) => setVerificationCode(parseInt(e.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleVerificationCodeMatch}>
            Verificar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={updatePasswordModalIsOpen}
        onHide={() => setUpdatePasswordModalIsOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Contraseña:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nueva Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmar Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && (
              <Form.Text
                className={
                  passwordError.includes("ok") ? "text-success" : "text-danger"
                }
              >
                {passwordError}
              </Form.Text>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setUpdatePasswordModalIsOpen(false)}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleUpdatePassword}>
            Actualizar Contraseña
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
