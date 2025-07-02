import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" }); // State to hold the form data

  const [show, setShow] = useState(false); // State to toggle password visibility
  const [passwordArray, setPasswordArray] = useState([]); // State to hold the array of saved passswords

  const getPasswords = async () => {
    let res = await fetch("http://localhost:3000/");
    let password = await res.json();
    console.log(password);
    setPasswordArray(password);
  };

  // console.log(setForm)
  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      // Save the password to localStorage and update the state
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]); // Update the passwordArray state with the new form data
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      

      // Save the updated passwordArray to localStorage
      // localStorage.setItem(
      // "password",
      // JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      // console.log(...passwordArray, {...form, id: uuidv4()});

      setForm({ site: "", username: "", password: "" }); // Clear the form fields

      toast("Password saved successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } else {
      toast("Please fill all fields with valid data");
    }
  };

  const editPassword = (id) => {
    // console.log("Editing");
    let c = confirm("Do you want to edit password?");
    if (c) {
      setForm({...passwordArray.filter((i) => i.id === id)[0], id: id});
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };
  const deletePassword = async (id) => {
    let c = confirm("Do you want to delete the password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // localStorage.setItem(
      //   "password",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      toast("Password deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };

  const handleChange = (e) => {
    // Handle input changes and update the form state
    setForm({ ...form, [e.target.name]: e.target.value }); // Update the form state with the new input value
    // console.log(form);
  };

  const showPassword = () => {
    // Toggle the visibility of the password input field
    setShow((prev) => !prev); // Toggle the show state
  };

  // if(refPass.current.type === "password")

  const copyText = (text) => {
    // Function to copy text to clipboard
    toast("Copy to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
    navigator.clipboard.writeText(text); // Copy the text to clipboard
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      <div className="absolute top-0 z-[-2] h-screen w-[100%] bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="p-3 md:mx-auto md:py-20 md:px-50 ">
        <h1 className="text-4xl font-bold text-center px-8">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">MGR/&gt;</span>
        </h1>
        <p className="text-center">Your own Password Manager</p>
        <div className="flex flex-col space-y-4 py-4">
          <input
            value={form.site}
            onChange={handleChange}
            className="border border-green-500 rounded-full"
            placeholder="Enter website URL"
            type="text"
            name="site"
          />
          <div className=" relative flex flex-col md:flex-row w-full justify-between gap-2">
            <input
              value={form.username}
              onChange={handleChange}
              className="border border-green-500 rounded-full w-full"
              type="text"
              placeholder="Enter Username"
              name="username"
              //   id=""
            />
            <input
              value={form.password}
              onChange={handleChange}
              className="border border-green-500 rounded-full w-full"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              // id=""
            />
            <span
              onClick={showPassword}
              className="absolute right-[10px] top-[73px] md:top-[17px] cursor-pointer"
            >
              <img
                width={15}
                src={show ? "icons/eyecross.png" : "icons/eye.png"}
                alt="eye"
              />
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={savePassword}
            className="bg-green-700 px-6 py-1 gap-2 rounded-full flex items-center font-bold hover:bg-green-600 transition duration-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="flex flex-col py-4">
          <h1 className="font-bold text-2xl py-4">Your Passwords</h1>
          {passwordArray.length === 0 && <div>No Passwords Saved</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-sm overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {/* // Map through the passwordArray and render each item 
              // Note: Using index as key is not recommended in production code, but for this simple example,
              // we can use index as key here because we are not going to change the order of the items */}
                {passwordArray.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-green-200 transition during-300"
                    >
                      <td className="text-center w-30 py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <animated-icons
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                            trigger="hover"
                            className='m-2 {"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
                            height="20"
                            width="20"
                          ></animated-icons>
                        </div>
                      </td>
                      <td className="text-center w-30 py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <animated-icons
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                            trigger="hover"
                            className='m-2 {"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
                            height="20"
                            width="20"
                          ></animated-icons>
                        </div>
                      </td>
                      <td className="text-center w-30 py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <animated-icons
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                            trigger="hover"
                            className='m-2 {"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
                            height="20"
                            width="20"
                          ></animated-icons>
                        </div>
                      </td>
                      <td className="text-center w-30 py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <span
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <animated-icons
                              src="https://animatedicons.co/get-icon?name=edit&style=minimalistic&token=bef79568-d828-4e67-a904-60a1bb446375"
                              trigger="hover"
                              className='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
                              height="25"
                              width="25"
                            ></animated-icons>
                          </span>
                          <span
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <animated-icons
                              src="https://animatedicons.co/get-icon?name=delete&style=minimalistic&token=c1352b7b-2e14-4124-b8fd-a064d7e44225"
                              trigger="hover"
                              className='{"variationThumbColour":"#536DFE","variationName":"Two Tone","variationNumber":2,"numberOfGroups":2,"backgroundIsGroup":false,"strokeWidth":1,"defaultColours":{"group-1":"#000000","group-2":"#536DFE","background":"#FFFFFF"}}'
                              height="20"
                              width="20"
                            ></animated-icons>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
