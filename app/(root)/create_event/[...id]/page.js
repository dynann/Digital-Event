"use client";
import EventDetail from "@components/layout/EventDetail";
import { useState, useEffect } from "react";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import SurveyForm from "@components/FormCard/SurveyForm";
import Button from "@components/Button/Button";
import ResultSurveyForm from "@components/FormCard/ResultSurveyForm";
import { useRouter } from "@node_modules/next/navigation";
import emailjs, { send } from '@emailjs/browser';
import { use } from "react";

import { FaRegCheckCircle } from "react-icons/fa";

import { RxCrossCircled } from "react-icons/rx";
import LoadingPage from "@components/util/Loading";

const DynamicRoutePage = ({ params }) => {
  const [activeView, setActiveView] = useState("viewDetail");
  const [eventData, setEventData] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const [error, setError] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const router = useRouter();
  const [isSurveyFormVisible, setIsSurveyFormVisible] = useState(false);
  const [senders, setSenders] = useState([])
  const [responder, setResponder] = useState({
    responderEmails: {},
    eventID: null,
  });

  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};
  const eventIdNumber = Number(id);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://coding-fairy.com/api/mock-api-resources/1734491523/eventify"
        );
        const result = await response.json();
        const event = result.find((event) => event.id === eventIdNumber);
        setEventData(event);
        setSenders(event.registerEmail);
        setResponder({ eventID: eventIdNumber });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [eventIdNumber]);

  const handleCancel = () => {
    setIsOverlayVisible(false); // Hide overlay
    setOverlayMessage("");
  };

  const onSubmitButton = async () => {
    console.log(selectedEmails)
    console.log(responder)
    setResponder({ responderEmails: selectedEmails })
    console.log(responder)
    try {
      const response = await fetch(
        "https://coding-fairy.com/api/mock-api-resources/1734491523/responder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responder),
        }
      );

      if (!response.ok) {
        setIsOverlayVisible(true);
        setOverlayMessage("Failed to post request.");
        return;
      }

      const emailPromises = selectedEmails.map((email) => {
        const templateParams = {
          to_email: email,
          to_name: email,
          message: 'https://eventify-pearl.vercel.app/survey',
        };

        return emailjs.send(
          "service_okd15r2",
          "template_uuxk1ab",
          templateParams,
          "beDn_1Gr5miERdH1L"
        );
      });

      try {
        const emailResults = await Promise.all(emailPromises);
        console.log("Emails sent successfully:", emailResults);
        setIsOverlayVisible(true);
        setOverlayMessage("Emails sent to selected participants.");
      } catch (error) {
        console.error("Error sending emails:", error);
        setIsOverlayVisible(true);
        setOverlayMessage("An error occurred while processing your request.");
      }

    } catch (error) {
      throw new Error("fetching error");
    }
  };

  const handleSelectEmail = (email) => {
    setSelectedEmails((prev) => {
      const updatedEmails = prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email];

      setResponder((prevResponder) => ({
        ...prevResponder,
        responderEmail: updatedEmails,
      }));

      return updatedEmails;
    });
  };

  const handleSelectAll = () => {
    if (eventData?.registerEmail) {
      const allSelected =
        selectedEmails.length === eventData.registerEmail.length;
      const updatedEmails = allSelected ? [] : [...eventData.registerEmail];

      setSelectedEmails(updatedEmails);
      setResponder((prevResponder) => ({
        ...prevResponder,
        responderEmail: updatedEmails,
      }));
    }
  };

  const toggleSurveyForm = () => {
    setIsSurveyFormVisible(!isSurveyFormVisible);
  };

  const handleBack = () => {
    router.back();
  };

  if (!eventData) {
    return (
      <div className='flex justify-center items-center'>
        <div className="min-w-screen w-full h-screen flex justify-center items-center">
          <div>
            <LoadingPage wh="h-screen" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col min-h-screen gap-8">

        <Header />
        <main className="flex-grow w-full flex flex-col items-center gap-8">
          <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 shadow-2xl gap-8">
            <Button param="Back" onClick={handleBack} />
            <button
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${activeView === "createSurvey"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
                }`}
              onClick={() => setActiveView("createSurvey")}
            >
              Create Survey
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${activeView === "resultSurvey"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
                }`}
              onClick={() => setActiveView("resultSurvey")}
            >
              Result Survey
            </button>
            <button
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm 
                        ${activeView === "viewDetail"
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 hover:text-gray-700"
                }`}
              onClick={() => setActiveView("viewDetail")}
            >
              View Detail
            </button>
          </div>

          {activeView === "viewDetail" && (
            <EventDetail {...eventData} blockButton="true" />
          )}

          {activeView === "createSurvey" && (
            <div className="m-auto  w-5/12">
              <div className="flex flex-col gap-8 w-full">
                <span className="text-start font-bold text-2xl text-black">
                  Select your registration!
                </span>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            eventData?.registerEmail &&
                            selectedEmails.length ===
                            eventData.registerEmail.length
                          }
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>ID</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventData?.registerEmail ? (
                      eventData.registerEmail.map((email, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedEmails.includes(email)}
                              onChange={() => handleSelectEmail(email)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          <span>No registered emails available.</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <button
                  onClick={toggleSurveyForm}
                  className="w-fit border-b-customPurple-default text-black p-2  hover:border-b-customPurple-hover border-b-2"
                >
                  {isSurveyFormVisible ? "Hide Survey Form" : "View Survey Form"}
                </button>
                {isSurveyFormVisible && <SurveyForm viewOnly="yes" />}
                <button
                  type="submit"
                  className="w-full text-white p-2 rounded-md bg-customPurple-default hover:bg-customPurple-hover transition-all"
                  onClick={onSubmitButton}>
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
          {activeView === "resultSurvey" && (
            <div className="m-auto w-5/12">
              <ResultSurveyForm
                detailSurvey="yes"
                eventIdNumber={eventIdNumber}
                senders={senders}
              />
            </div>
          )}
        </main>

        <Footer />
      </div>
      {isOverlayVisible && (
        <div className="absolute top-0 right-0 h-full w-full z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white shadow-lg w-fit text-black text-sm py-4 px-6 rounded-md flex flex-col items-center">
            <FaRegCheckCircle size={100} color="green" />
            <span className="my-5 text-black">{overlayMessage}</span>
            <button
              onClick={handleCancel}
              className="mt-2 bg-white text-black py-1 px-4 border-2 border-black rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicRoutePage;
