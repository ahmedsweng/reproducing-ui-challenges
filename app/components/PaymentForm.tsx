"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2"; // Optional, for country selection
import "react-phone-input-2/lib/style.css"; // Import styles for phone input
import * as yup from "yup";
import FlightCard from "./FlightCard";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Validation schema using yup
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  countryCode: yup.string().required("Country code is required"),
  gender: yup.string().required("Gender is required"),
  dob: yup.date().required("Date of birth is required"),
  preferredContact: yup
    .string()
    .required("Preferred contact method is required"),
  frequentFlyerProgram: yup.string(), // Optional field
  frequentFlyerNumber: yup.string(), // Optional field
  knownTravelerNumber: yup.string(), // Optional field
  privacyAndPolicyCheck: yup
    .boolean()
    .isTrue("Please Accept Out Terms and conditions before proceed"),
});

type PaymentFormType = yup.InferType<typeof schema>;

const Form = ({ deal }: { deal: FlattenedFlightDeal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const handleScroll = () => {
      const form = formRef.current;
      const card = cardRef.current;

      if (!form || !card) return;

      const formRect = form.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If the card is below the window's bottom and form is in view
      if (formRect.top < 0 && cardRect.top < windowHeight) {
        card.classList.add("lg:sticky");
        form.classList.add("lg:sticky");
      } else {
        card.classList.remove("lg:sticky");
        form.classList.remove("lg:sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onSubmit = async (data: PaymentFormType) => {};

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[80%] w-[90%] mx-auto flex flex-col-reverse lg:flex-row py-6 gap-20 justify-center"
    >
      {/* Passenger Info Section */}
      <div className="flex-1 gap-6 flex flex-col">
        <h2 className="text-3xl font-bold text-[#1D2939]">Passenger Info</h2>
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex-1">
            <label className="block text-gray-700 my-2 font-semibold">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              placeholder="First name"
              className="w-full border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 my-2 font-semibold">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName")}
              placeholder="Last name"
              className="w-full border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-6">
          <div className="w-full">
            <label className="block text-gray-700 my-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@company.com"
              className="w-full border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-6 w-full">
            <div className="flex-1">
              <label className="block text-gray-700 my-2 font-semibold">
                Phone Number
              </label>
              <PhoneInput
                country={"us"}
                value=""
                placeholder="(555) 000-0000"
                onChange={(phone, country: any) => {
                  setValue(
                    "phoneNumber",
                    phone.slice(country.dialCode?.length)
                  );
                  setValue("countryCode", country.dialCode);
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                  autoComplete: "off",
                }}
                containerClass="flex-1"
                inputStyle={{
                  flex: 1,
                  width: "100%",
                }}
                buttonStyle={{
                  backgroundColor: "white",
                }}
                inputClass="p-2 flex-1 w-full focus-within:border-[#ff7a00] focus-within:ring focus-within:ring-opacity-50 focus-within:ring-[#ff7a00]"
              />

              {errors.phoneNumber && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 my-2 font-semibold">
                Gender
              </label>
              <select
                {...register("gender")}
                className="w-full bg-white border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row flex-wrap justify-between w-full gap-6">
            <div className="flex-1">
              <label className="block text-gray-700 my-2 font-semibold">
                Preferred Method of Contact
              </label>
              <select
                {...register("preferredContact")}
                className="w-full bg-white border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
              >
                <option value="">Select</option>
                <option value="Whatsapp">WhatsApp</option>
                <option value="Signal">Signal</option>
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
              </select>
              {errors.preferredContact && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.preferredContact.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-gray-700 my-2 font-semibold">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dob")}
                placeholder="YYYY-MM-DD"
                className="w-full bg-transparent border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
              />
              {errors.dob && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-6 w-full">
          <div className="flex-1">
            <label className="block text-gray-700 my-2 font-semibold">
              Frequent Flyer Program{" "}
              <span className="text-sm text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("frequentFlyerProgram")}
              className="w-full border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
              placeholder="Enter your program"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 my-2 font-semibold">
              Frequent Flyer Number{" "}
              <span className="text-sm text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("frequentFlyerNumber")}
              className="w-full border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
              placeholder="Enter your number"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 my-2 font-semibold">
              Known Traveler Number{" "}
              <span className="text-sm text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("knownTravelerNumber")}
              className="w-full border border-gray-300 p-2 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]"
              placeholder="Enter your number"
            />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="w-full flex flex-col gap-y-3">
          <h2 className="text-3xl font-bold mb-6 text-[#1D2939]">
            Payment Details
          </h2>
          <CardElement className="p-2 border border-gray-300 rounded-md focus:border-[#ff7a00] focus:ring focus:ring-opacity-50 focus:ring-[#ff7a00]" />

          {message && <div className="text-red-600 mt-2">{message}</div>}
          <div className="border border-gray-300 rounded-lg p-2 flex flex-row items-center justify-start gap-x-2">
            <input type="checkbox" {...register("privacyAndPolicyCheck")} />
            <p className="text-[#475467]">
              I have reviewed the Privacy Policy and accept the Terms and
              Conditions.
            </p>
          </div>
          {errors.privacyAndPolicyCheck && (
            <p className="text-red-600 text-sm mt-1">
              {errors.privacyAndPolicyCheck.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full button-bg text-black font-semibold p-3 rounded-md hover:bg-[#e66d00] mt-4 transition ease-in-out duration-300"
            disabled={loading || !stripe || !elements}
          >
            {loading ? "Processing..." : `Reserve Seat: ${deal.Cost}`}
          </button>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center flex-1">
              <p className="text-center text-[#1D2939] font-semibold text-lg">
                Your card will not be charged until the ticket is confirmed.
              </p>
            </div>
            <div className="flex flex-col justify-between items-center p-2 border border-gray-300 rounded-lg">
              <p>Secured by</p>
              <Image alt="" src={"/Stripe.svg"} width={80} height={80} />
            </div>
          </div>
        </div>
      </div>

      {/* Flight Card Detail */}
      <div
        ref={cardRef}
        className="flex flex-col top-0 gap-y-3 z-30 items-center "
      >
        <FlightCard toPage={false} flightDetails={deal} />
        <div className="flex flex-col text-center items-center gap-y-2 border border-gray-300 rounded-xl p-3">
          <p className="font-semibold text-lg text-[#1D2939]">
            Want to speak with a human before booking?
          </p>
          <p className="text-[#1D2939]">
            We&apos;re available 24/7 on Whatsapp.
          </p>
          <Link
            href="/"
            // target="_blank"
            className="w-full bg-[#F2F4F7] hover:bg-gray-300 p-3 rounded-xl font-semibold text-[#1D2939]"
          >
            Connect with the Concierge Team
          </Link>
        </div>
      </div>

      {/* <div className="w-full h-[1px] bg-black/15" /> */}
    </form>
  );
};

const PaymentForm = ({ deal }: { deal: FlattenedFlightDeal }) => {
  return (
    <Elements stripe={stripePromise}>
      <Form deal={deal} />
    </Elements>
  );
};

export default PaymentForm;
