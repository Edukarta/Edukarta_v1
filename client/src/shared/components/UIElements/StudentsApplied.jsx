import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Document, Page } from "react-pdf";
import ModalResume from "./ModalResume";
import classes from "./StudentsApplied.module.css";
import { callApi } from "../../../utils/apiUtils";
import { useNavigate } from "react-router-dom";

const StudentsApplied = (props) => {
  const [school, setSchool] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const getSchool = async () => {
    const response = callApi(`${process.env.REACT_APP_API_URL}/api/v1/schools/${props.id}/apply`,"GET")
    const data = await response;
    const statusCode = data.status;
    if(statusCode === 429 || statusCode ===403){
      navigate("/captcha")
    }
    setSchool(data.data);
  };

  useEffect(() => {
    getSchool();
  }, [props.id]);

  return (
    <div className={classes.student_applied}>
      <ModalResume show={openModal} onClick={() => setOpenModal(false)}>
        {selectedUser && selectedUser.resumePath && (
          <>
            <h2 className={classes.modal_title}>
              {selectedUser.firstname} {selectedUser.lastname}{" "}
              <span className={classes.span_title}>
                has applied to your school.
              </span>
            </h2>
            <div className={classes.container_resume}>
              <div className={classes.container_item}>
                {selectedUser.resumePath.endsWith(".pdf") ? (
                  <>
                    <iframe src={selectedUser.resumePath} />
                  </>
                ) : (
                  <img src={selectedUser.resumePath} alt="Resume" />
                )}
                <a
                  href={selectedUser.resumePath}
                  download={selectedUser.resumePath}
                  target="_blank"
                >
                  Download
                </a>
              </div>
              <div className={classes.container_item}>
                {selectedUser.letter1Path.endsWith(".pdf") ? (
                  <iframe src={selectedUser.letter1Path} />
                ) : (
                  <img src={selectedUser.letter1Path} alt="Letter 1" />
                )}
                <a
                  href={selectedUser.letter1Path}
                  download={selectedUser.letter1Path}
                  target="_blank"
                >
                  Download
                </a>
              </div>
              <div className={classes.container_item}>
                {selectedUser.letter2Path.endsWith(".pdf") ? (
                  <iframe src={selectedUser.letter2Path} />
                ) : (
                  <img src={selectedUser.letter2Path} alt="Letter 2" />
                )}
                <a
                  href={selectedUser.letter2Path}
                  download={selectedUser.letter2Path}
                  target="_blank"
                >
                  Download
                </a>
              </div>
            </div>
          </>
        )}
      </ModalResume>
      <div className={classes.student_applied_header}>
        <h2 className={classes.modal_title}>
          They <span className={classes.span_title}>have applied to your institution.</span>
        </h2>
      </div>
      <div className={classes.student_applied_body}>
        {school?.map((student, index) => (
  
            <div
              key={index}
              className={classes.item_student}
              onClick={() => {
                setOpenModal(true);
                setSelectedUser(student);
              }}
            >
              <div className={classes.container_avatar}>
                <Avatar medium image={student.imagePath} />
              </div>
              <div className={classes.container_student_infos}>
                <h5 className={classes.student_name}>
                  {student.firstname} <br /> {student.lastname}
                </h5>
                <span className={classes.student_location}>
                  {student.location}
                </span>
              </div>
            </div>

        ))}
      </div>
    </div>
  );
};

export default StudentsApplied;
