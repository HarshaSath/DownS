"use client"
import './page.css'
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWidget from "../components/global_comp/chat_widget/chat_widget";
import Navbar from '../components/global_comp/navbar/navbar';
import Footer from '../components/global_comp/footer/footer';

export default function Home() {

  const [content, setContent] = useState("");
  const [retrived_content, setRContent] = useState("");

  useEffect(() => {
    function reveal() {
      const reveals = document.querySelectorAll(".reveal");

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 200;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);

    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  const handleChange = (e) =>{
      setContent(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!content) {
      Swal.fire({
        title: 'No Description',
        text: 'Please provide a description about the patient before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const processingPopup = Swal.fire({
      title: 'Processing...',
      html: 'Please wait while the data is being processed.<br><div class="spinner-border" role="status"></div>',
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false,
    });
  
    try {
      // Send the 'content' to the backend
      const response = await axios.post('http://127.0.0.1:5000/ner_predict', { text: content });
      console.log("Successfully Sent to backend");
      const processedData = response.data;
      
      setRContent(processedData);
  
      setTimeout(() => {
        Swal.fire({
          title: 'Processing Complete',
          html: 'The data has been processed successfully.',
          icon: 'success',
          showConfirmButton: true,
        });
      }, 2000); 
    } catch (error) {
      console.log('Error:', error);
      Swal.fire({
        title: 'Processing Failed',
        html: 'Something Went Wrong',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  };
  
  const handleClear = () => {
    setContent("");
  };
  

  const nav_links = [
    { name: "Home", href: "#home" },
    { name: "Get Started", href: "#get_started" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <Navbar
        logolink="#home"
        links={nav_links}
      />
      <ChatWidget />
      <div id='home' className="hero">
        <div className="hero_text col-8">
          <p>
            <span className='display-1 fw-bold'><span className='cus_color'>Hello</span> User!</span>  <br /><br />
            <span className='display-5 fw-normal'>Welcome to <br/> <span className='cus_color'>FindDownSyndrome.com</span></span> <br />
          </p>
          <p className='fs-5 col-xl-6 col-7'>
            Using artificial intelligence, we can diagnose any down syndrome symptoms of your loved one's.
          </p>
          <div className="col-6 col-xl-3">
            <a href='#get_started'>
              <button className="btn start_btn fw-bold">
                Get Started
              </button>
            </a>

          </div>
        </div>
      </div>

      <section className='m-2'>

        <div className="container p-0 reveal">
          <div className="row d-flex m-0">
            <div className="text-box shadow rounded-3 col-xl-6 col-md-6 col-12 d-flex flex-column p-5">
              <h3>Whats Down Syndrome?</h3>
              <br />
              <p>
                In every cell in the human body there is a nucleus, where genetic material is stored in genes.
                Genes carry the codes responsible for all of our inherited traits and are grouped along rod-like structures called
                chromosomes. Typically, the nucleus of each cell contains 23 pairs of chromosomes, half of which are inherited from
                each parent. Down syndrome occurs when an individual has a full or partial extra copy of chromosome 21.
                <br /><br />
                This additional genetic material alters the course of development and causes the characteristics associated with
                Down syndrome. A few of the common physical traits of Down syndrome are low muscle tone, small stature, an upward slant
                to the eyes, and a single deep crease across the center of the palm although each person with Down syndrome is a
                unique individual and may possess these characteristics to different degrees, or not at all.
              </p>
            </div>

            <div className='col-xl-6 col-md-6 col-12 p-4 mt-1 text-center'>
              <img className="container-flex img shadow-lg img-fluid rounded-3" src='/page/whatis.png' alt='image'></img>
            </div>
          </div>
        </div>


      </section>

      <section className='m-2'>

        <div className="container p-0 reveal">
          <div className="row d-flex m-0">

            <div className='col-xl-6 col-md-6 col-12 p-4 mb-1 text-center'>
              <img className="container-flex img shadow-lg img-fluid rounded-3" src='/page/child.png' alt='image'></img>
            </div>

            <div className="text-box shadow rounded-3 col-xl-6 col-md-6 col-12 d-flex flex-column p-5">
              <h3>What is the likelihood of having a child with Down syndrome?</h3>
              <br />
              <p>
                Down syndrome occurs in people of all races and economic levels, though older women have an increased chance
                of having a child with Down syndrome. A 35-year-old woman has about a one in 350 chance of conceiving a child
                with Down syndrome, and this chance increases gradually to 1 in 100 by age 40. At age 45 the incidence becomes
                approximately 1 in 30. The age of the mother, or birthing parent, does not seem to be linked to the risk of
                translocation.
                <br /><br />
                Since many couples are postponing parenting until later in life, the incidence of Down syndrome conceptions is
                expected to increase. Therefore, genetic counseling for parents is becoming increasingly important. Still, many
                physicians are not fully informed about advising their patients about the incidences of Down syndrome, advancements
                in diagnosis, and the protocols for care and treatment of babies born with Down syndrome.
              </p>
            </div>

          </div>
        </div>
      </section>

      <div id='get_started' className='ai_section reveal'>
        <section className='m-2'>
          <div className="container reveal">
            <div className="row m-0 text-center justify-content-center">

            <span className='display-3 fw-bold mb-5'>Lets Get <span className='cus_color'>Started!</span> </span> <br />

              <div className="col-xl-6 col-lg-6 col-md-7 col-sm-8 col-12 form_container p-4 rounded-4 shadow">
                <p className='fs-4'>Enter a description about your patient's behaviour</p>

                <form onSubmit={handleSubmit}>
                  <div className="container-flex d-flex">
                    <div className="form-floating w-100">
                      <div>
                        <textarea className="form-control mb-3 rounded-4 shadow" id="floatingTextarea" onChange={handleChange} value={content}
                          style={{ maxHeight: "150px", minHeight: "150px", backgroundColor: "transparent", color: "white" }}>
                        </textarea>
                        <textarea className="form-control mb-2 rounded-4 shadow " id="floatingTextarea" disabled value={retrived_content}
                          style={{ maxHeight: "150px", minHeight: "150px", backgroundColor: "transparent", color: "white" }}>

                        </textarea>
                      </div>

                      <div className="col text-end">
                        <button type='reset' onClick={handleClear} className="btn col-3 clear_btn  m-1 rounded-3">Clear</button>
                        <button type='submit' className="btn col-3 submit_btn rounded-3">Submit</button>
                      </div>

                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </section>
      </div>


      <section id='about' className='m-2'>

        <div className="container reveal">
          <div className="row d-flex m-0">

            <div className="text-box text-center shadow rounded-3 col-12 d-flex flex-column p-4 reveal">
              <h3>About Us</h3>
              <br />
              <p className='fs-4 fst-italic text-center p-5'>
                Welcome to FindDownSyndrome.com, your trusted source for Down syndrome information and support. At FindDownSyndrome.com, we are committed
                to providing valuable resources and assistance to individuals and families seeking information about Down syndrome
                symptoms and diagnosis. Our user-friendly platform utilizes cutting-edge AI technology to deliver personalized
                responses based on user descriptions, helping you better understand the condition and its implications.
                Whether you're a concerned parent, caregiver, or simply looking to increase your knowledge, FindDownSyndrome.com is here to
                empower you with the information you need. Our mission is to promote awareness, share knowledge, and foster a
                supportive community, ensuring that no one faces the journey of Down syndrome alone. Join us in our mission to make
                informed decisions and provide the best possible care and support for your loved ones.
              </p>

            </div>

          </div>
        </div>


      </section>

      <div id='contact'>
        <Footer />
      </div>

    </>
  );
}
