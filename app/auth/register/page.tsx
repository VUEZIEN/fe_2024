"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";
import { RegisterPayload } from "../interface";
import useAuthModule from "../lib";

const registerSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
  email: yup.string().nullable().email().default("").required("tolong isi terlebih dahulu"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("tolong isi terlebih dahulu"),
});

const Register = () => {
  const { useRegister } = useAuthModule();
  const { mutate, isLoading, handeleMessage, handleTyping} = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    // validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
    touched,
  } = formik;

  return (
    <section className="m-10">
      <h1>Register</h1>
      erors : {JSON.stringify(errors)}
      <br />
      values : {JSON.stringify(values)}
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} className="space-y-5">
          <section>
            <Label htmlFor="nama" title="Nama" />
            <InputText
              value={values.nama}
              placeholder="your name"
              id="nama"
              onChange={handleChange}
              name="nama"
              isError={getIn(errors, "nama")}
              messageError={getIn(errors, "nama")}
            />
          </section>
          <section>
            <Label htmlFor="email" title="Email" />
            <InputText
              value={values.email}
              placeholder="your email"
              id="email"
              name="email"
              onChange={(e) => {
                handleChange(e)
                handleTyping("email")
              }}
              onBlur={handleBlur}
              isError={getIn(errors, "email") || handeleMessage("email")}
              messageError={errors?.email || handeleMessage("email")}
            />
          </section>
          <section>
            <Label htmlFor="password" title="Password" />
            <InputText
              value={values.password}
              placeholder="strong password"
              id="password"
              onChange={(e) => {
                handleChange(e)
                handleTyping("email")
              }}
              onBlur={handleBlur}
              isError={getIn(errors, "password") || handeleMessage("password")}
              messageError={errors?.password || handeleMessage("password")}
              name="password"
            />
          </section>
          <section>
            <Button
              title="register"
              colorSchema="blue"
            />
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};

export default Register;
