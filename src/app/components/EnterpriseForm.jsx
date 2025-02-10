"use client";

import React, { useState } from "react";

import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

import FlagSelector from "./ReactFlagsSelect";
import TextInputLiveFeedback from "./TextInputLiveFeedback";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Debe tener al menos 3 caracteres")
    .required("La razón social es requerida"),
  rfc: Yup.string()
    .length(12, "Debe tener exactamente 12 caracteres")
    .transform((value) => value.toUpperCase())
    .matches(
      /^[A-Z]{3}[0-9]{6}[A-Z0-9]{3}$/,
      "Formato inválido: 3 letras + 6 números + 3 caracteres alfanuméricos",
    )
    .required("El RFC es requerido"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Debe ser un número de 10 dígitos")
    .required("El teléfono es requerido"),
  contact: Yup.string()
    .min(3, "Debe tener al menos 3 caracteres")
    .required("El contacto es requerido"),
  mail: Yup.string()
    .matches(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
      "Debe ser un correo válido con una sola @",
    )
    .required("El correo es requerido"),
});

const EnterpriseForm = () => {
  const [phoneCode, setPhoneCode] = useState("+52");

  const formik = useFormik({
    initialValues: {
      name: "",
      rfc: "",
      phone: "",
      contact: "",
      mail: "",
    },
    validationSchema,
    onSubmit: (values) => {
      toast(
        `¡Empresa registrada exitosamente!\n
          Razón Social: ${values.name}\n
          RFC: ${values.rfc.toUpperCase()}\n
          Teléfono: ${phoneCode} ${values.phone}\n
          Contacto: ${values.contact}\n
          Correo: ${values.mail}
        `,
        {
          style: {
            borderRadius: "14px",
            background: "#3F4F44",
            color: "#fff",
          },
          position: "top-right",
          duration: 5000,
        },
      );
    },
  });

  const isFormValid =
    formik.isValid &&
    Object.keys(formik.touched).length ===
      Object.keys(formik.initialValues).length;

  const handleRfcChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 12) {
      formik.setFieldValue("rfc", value);
    }
  };

  return (
    <FormikProvider value={formik}>
      <Toaster position="top-right" />
      <Form className="m-auto p-[10px] w-[925px] h-[550px] shadow-lg drop-shadow-md border-2 border-[#2C3930] rounded-lg">
        <h1 className="mb-4 text-4xl text-[#3F4F44] font-bold text-center sm:text-left">
          Registro de empresas
        </h1>
        <TextInputLiveFeedback
          label="Razón Social"
          id="name"
          name="name"
          type="text"
          placeholder="Razón Social de la Empresa"
          helpText="Nombre completo de la empresa"
        />

        <div className="columns-3 gap-4 mt-4">
          <TextInputLiveFeedback
            label="RFC"
            id="rfc"
            name="rfc"
            type="text"
            placeholder="RFC de la Empresa"
            helpText="RFC con homoclave"
            onChange={handleRfcChange}
            maxLength={12}
            style={{ textTransform: "uppercase" }}
          />
          <div className="phone-input-container relative">
            <label htmlFor="phone" className="text-lg font-semibold">
              Teléfono
            </label>
            <div className="flex items-center">
              <FlagSelector
                onSelect={(code) => {
                  setPhoneCode(code);
                  formik.setFieldValue("phone", formik.values.phone || "");
                }}
              />
              <TextInputLiveFeedback
                id="phone"
                name="phone"
                type="tel"
                placeholder="Número de teléfono"
                helpText="10 dígitos sin espacios"
                phoneCode={phoneCode}
              />
            </div>
          </div>
        </div>

        <TextInputLiveFeedback
          label="Contacto"
          id="contact"
          name="contact"
          type="text"
          placeholder="Contacto de la Empresa"
          helpText="Nombre del contacto principal"
        />

        <div className="columns-2 gap-4 mt-4">
          <TextInputLiveFeedback
            label="Correo"
            id="mail"
            name="mail"
            type="email"
            placeholder="Correo de la Empresa"
            helpText="Correo electrónico corporativo"
          />

          <button
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            className={`p-[8px] font-semibold text-white rounded-full w-full mt-6 
            ${
              formik.isValid && formik.dirty
                ? "bg-[#3F4F44] hover:bg-[#2C3930] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Registrar Empresa
          </button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default EnterpriseForm;
