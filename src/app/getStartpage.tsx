import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

interface ResponseData {
  isDownSyndromeDetected: boolean;
  totalPercentage: number;
  textUsedForDiagnosis: string[];
}

export default function GetStart() {
  const [content, setContent] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [percentage, setPercentage] = useState<number | "" | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [displayDataReceived, setDisplayDataReceived] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      Swal.fire({
        title: "No Description",
        text: "Please provide a description about the patient before submitting.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const processingPopup = Swal.fire({
      title: "Processing...",
      html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
    });

    setTimeout(async () => {
      try {
        // Send the 'content' to the backend
        const response = await axios.post<ResponseData>("http://humorous-mule-uniformly.ngrok-free.app/ner_predict", { text: content });
        console.log(response.data.isDownSyndromeDetected);
        console.log(response.data.totalPercentage);
        console.log(response.data.textUsedForDiagnosis);

        if (response.data.isDownSyndromeDetected) {
          setDiagnosis("detected");
        } else {
          setDiagnosis("not detected");
        }

        setPercentage(response.data.totalPercentage);
        setSymptoms(response.data.textUsedForDiagnosis);
        setDisplayDataReceived(true);

        Swal.fire({
          title: "Processing Complete",
          html: "The data has been processed successfully.",
          icon: "success",
          showConfirmButton: true,
        });
      } catch (error) {
        console.log("Error:", error);
        Swal.fire({
          title: "Processing Failed",
          html: "Something Went Wrong",
          icon: "error",
          showConfirmButton: true,
        });
      }
    }, 1000);
  };

  const handleClear = () => {
    setContent("");
    setDiagnosis("");
    setPercentage(null);
    setSymptoms([]);
    setDisplayDataReceived(false);
  };

  return (
    <>
      <div className="row m-0 text-center justify-content-center">
        <span className='display-3 fw-bold mb-5'>Lets Get <span className='cus_color'>Started!</span> </span> <br />

        <div className="col-xl-6 col-lg-6 col-md-7 col-sm-8 col-12 form_container p-4 rounded-4 shadow">
          <p className='fs-5 fw-bold'>Enter a little description about your patient's behavior</p>
          <p className='text-start'>Include information about his/her regular behaviors, different body features, facial features, anxiety, depression, etc.</p>

          <form onSubmit={handleSubmit}>
            <div className="container-flex d-flex">
              <div className="form-floating w-100">
                <div>
                  <textarea
                    className="form-control mb-3 rounded-4 shadow"
                    id="floatingTextarea"
                    onChange={handleChange}
                    value={content}
                    style={{ maxHeight: "150px", minHeight: "150px", backgroundColor: "transparent", color: "white" }}
                  ></textarea>

                  {displayDataReceived && (
                    <div
                      className="container mb-3 rounded-4 p-3 --bs-bg-opacity: .5 shadow text-start"
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <p className='fw-bold'>
                        According to our analysis, your patient has <span className='fw-bolder text-danger'>{diagnosis}</span> Down Syndrome.<br />
                        The analysis detects that the patient has <span className='fw-bolder text-danger'>{percentage}%</span> chance of having Down Syndrome based on the symptoms
                        you provided above.<br />
                        The <span className='fw-bolder text-danger'>symptoms</span> are:
                        <ul>
                          {symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                          ))}
                        </ul>
                      </p>
                    </div>
                  )}
                </div>

                <div className="col text-end">
                  <button
                    type="reset"
                    onClick={handleClear}
                    className="btn col-3 clear_btn m-1 rounded-3"
                  >
                    Clear
                  </button>
                  <button type="submit" className="btn col-3 submit_btn rounded-3">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// export default function GetStart() {

//     const [content, setContent] = useState("");
//     const [diagnosis, setDiagnosis] = useState("");
//     const [percentage, setPercentage] = useState("");
//     const [symptoms, setSymptoms] = useState([]);
//     const [displayDataReceived, setDisplayDataReceived] = useState(false);

//     const handleChange = (e) => {
//         setContent(e.target.value);
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!content) {
//             Swal.fire({
//                 title: "No Description",
//                 text: "Please provide a description about the patient before submitting.",
//                 icon: "warning",
//                 confirmButtonText: "OK",
//             });
//             return;
//         }

//         const processingPopup = Swal.fire({
//             title: "Processing...",
//             html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
//             allowOutsideClick: false,
//             showCancelButton: false,
//             showConfirmButton: false,
//         });

//         setTimeout(async () => {
//             try {
//                 // Send the 'content' to the backend
//                 const response = await axios.post("http://127.0.0.1:5000/ner_predict", { text: content });
//                 console.log(response.data.isDownSyndromeDetected);
//                 console.log(response.data.totalPercentage);
//                 console.log(response.data.textUsedForDiagnosis);

//                 if (response.data.isDownSyndromeDetected) {
//                     setDiagnosis("detected");
//                 } else {
//                     setDiagnosis("not detected");
//                 }

//                 setPercentage(response.data.totalPercentage);
//                 setSymptoms(response.data.textUsedForDiagnosis);
//                 setDisplayDataReceived(true); // Set the flag to true when data is received

//                 Swal.fire({
//                     title: "Processing Complete",
//                     html: "The data has been processed successfully.",
//                     icon: "success",
//                     showConfirmButton: true,
//                 });
//             } catch (error) {
//                 console.log("Error:", error);
//                 Swal.fire({
//                     title: "Processing Failed",
//                     html: "Something Went Wrong",
//                     icon: "error",
//                     showConfirmButton: true,
//                 });
//             }
//         }, 1000);
//     }

//     const handleClear = () => {
//         setContent("");
//         setDiagnosis("");
//         setPercentage("");
//         setSymptoms([]);
//         setDisplayDataReceived(false);
//     };
//     return (
//         <>
//             <div className="row m-0 text-center justify-content-center">

//                 <span className='display-3 fw-bold mb-5'>Lets Get <span className='cus_color'>Started!</span> </span> <br />

//                 <div className="col-xl-6 col-lg-6 col-md-7 col-sm-8 col-12 form_container p-4 rounded-4 shadow">
//                     <p className='fs-5 fw-bold'>Enter a little description about your patient's behaviour</p>
//                     <p className='text-start'>Include about his/her regular behaviours, different body features, facial features, anxiety, depression etc.</p>

//                     <form onSubmit={handleSubmit}>
//                         <div className="container-flex d-flex">
//                             <div className="form-floating w-100">
//                                 <div>
//                                     <textarea className="form-control mb-3 rounded-4 shadow" id="floatingTextarea" onChange={handleChange} value={content}
//                                         style={{ maxHeight: "150px", minHeight: "150px", backgroundColor: "transparent", color: "white" }}>
//                                     </textarea>

//                                     {/* Display section */}
//                                     {displayDataReceived && (
//                                         <div
//                                             className="container mb-3 rounded-4 p-3 --bs-bg-opacity: .5 shadow text-start"
//                                             style={{
//                                                 backgroundColor: "transparent",
//                                             }}
//                                         >
//                                             <p className='fw-bold'>
//                                                 According to our analysis, your patient have <span className='fw-bolder text-danger'>{diagnosis}</span> having Down Syndrome.<br />
//                                                 The analysis detects the patient has <span className='fw-bolder text-danger'>{percentage}%</span> chance of having Down Syndrome based on the symptoms
//                                                 you provided above.<br />
//                                                 The <span className='fw-bolder text-danger'>symptoms</span> are:
//                                                 <ul>
//                                                     {symptoms.map((symptom, index) => (
//                                                         <li key={index}>{symptom}</li>
//                                                     ))}
//                                                 </ul>
//                                             </p>
//                                         </div>
//                                     )}

//                                 </div>

//                                 <div className="col text-end">
//                                     <button
//                                         type="reset"
//                                         onClick={handleClear}
//                                         className="btn col-3 clear_btn  m-1 rounded-3"
//                                     >
//                                         Clear
//                                     </button>
//                                     <button type="submit" className="btn col-3 submit_btn rounded-3">
//                                         Submit
//                                     </button>
//                                 </div>

//                             </div>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </>
//     )
// }