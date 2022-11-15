import React, { useState } from "react";
import { Link } from "react-router-dom";
import Multiselect from 'multiselect-react-dropdown';
const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [dob, setDob] = useState();
  const [options, setOptions] = useState([{ name: 'business', id: 1 }, { name: 'entertainment', id: 2 }, { name: 'general', id: 3 }, { name: 'health', id: 4 }, { name: 'science', id: 5 }, { name: 'sports', id: 6 }, { name: 'business', id: 7 }, { name: 'technology', id: 8 }, { name: 'Virat Kohli', id: 9 }, { name: 'Narendra Modi', id: 10 }, { name: 'Rain', id: 13 }, { name: 'MK Stalin', id: 12 }, { name: 'Cinema', id: 13 }, { name: 'Floods', id: 14 }, { name: 'politics', id: 15 }, { name: 'Donald Trump', id: 16 }, { name: 'Putin', id: 17 }, { name: 'Ukraine-Russia', id: 18 }, { name: 'Biden', id: 19 }, { name: 'ADMK', id: 20 }, { name: 'Rahul Gandhi', id: 21 }, { name: 'China', id: 22 }, { name: 'corona', id: 23 }, { name: 'elon musk', id: 24 }, { name: 'worldcup', id: 25 }, { name: 'BJP', id: 26 }, { name: 'Taiwan China crisis', id: 27 }, { name: 'job opputunities', id: 28 }, { name: 'tourism', id: 29 }, { name: 'metroplian', id: 30 }]);
  const [selectedVal, setSelectedVal] = useState([]);

  const signupHandler = (e) => {
    e.preventDefault();
    if (password == confirm_password) {
      const payload = {
        email: email,
        password: password,
        options: selectedVal,
        name: name,
        phone: phone,
        dob: dob
      }
      fetch('http://169.51.205.76:32522/sign-up', {
        method: 'POST',
        mode: 'cors',
        redirect: 'manual',
        body: JSON.stringify(payload)
      }).then((res) => {
        if (res.status === 200) window.location.replace("/");
      })
    }
  }
  const onSelect = (selectedList, selectedItem) => {
    selectedVal.push(selectedItem)
  }

  const onRemove = (selectedList, removedItem) => {
    const index = selectedVal.indexOf(removedItem);
    if (index > -1) { // only splice array when item is found
      selectedVal.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="m-20 bg-white container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="phoneno"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />

            <input
              type="date"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="dob"
              placeholder="Date of Birth"
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />

            <Multiselect
              options={options}
              selectedValues={selectedVal}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
            />
            <button
              type="submit"
              onClick={signupHandler}
              className="mt-10 w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
            >Create Account</button>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the &nbsp;
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Terms of Service
              </a> and &nbsp;
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Privacy Policy
              </a> &nbsp;
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link to="/" className="no-underline border-b border-blue text-blue" href="../login/">
              Log in
            </Link>.
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;