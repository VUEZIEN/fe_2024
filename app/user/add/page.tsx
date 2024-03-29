"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Select from "@/components/Select";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { UserCreatePayload } from "../interface";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import useUserModule from "../lib";

export const userCreateSchema = yup.object().shape({
  nama: yup
    .string()
    .nullable()
    .default("")
    .required("isi nama kalian")
    .min(3, "Minimal 3 huruf")
    .max(30, "Maximal 30 huruf"),
  email: yup
    .string()
    .email("Invalid email address")
    .nullable()
    .default("")
    .required("isi email kailan"),
  umur: yup.number().nullable().default(undefined).required("isi umur kailan"),
  tanggal_lahir: yup.string().nullable().default("").required("isi tangal lahir kailan"),
  status: yup.string().nullable().default("").required("isi status kailan saat ini"),
});


export const option = [
  {
    value: 15,
    label: "15",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: 17,
    label: "17",
  },
  {
    value: 18,
    label: "18",
  },
  {
    value: 19,
    label: "19",
  },
  {
    value: 20,
    label: "20",
  },
];

const CreateUser = () => {
  const { useCreateUser } = useUserModule();
  const { mutate, isLoading } = useCreateUser();
  const formik = useFormik<UserCreatePayload>({
    initialValues: userCreateSchema.getDefault(),
    validationSchema: userCreateSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          window.location.href = "/user";
        },
      });
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
  } = formik;

  return (
    <section className="flex items-center justify-center w-full h-screen absolute top-[5vh]">
      <section className="w-1/3">
        <h2 className="text-xl font-bold text-gray-500">Tambah User</h2>
        {/* value : {JSON.stringify(values)} */}
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit} className="space-y-5">
            <section>
              <Label htmlFor="nama" title="nama" />
              <InputText
                onChange={handleChange}
                // onChange={(e) => {
                //   setFieldValue("nama", e.target.value);
                //   if (e.target.value === "ariiq") {
                //     setFieldValue("nama", e.target.value);
                //   }
                // }}
                onBlur={handleBlur}
                value={values.nama}
                placeholder="nama"
                id="nama"
                name="nama"
                isError={!!errors.nama}
                messageError={errors.nama}
              />
            </section>
            <section>
              <Label htmlFor="email" title="email" />
              <InputText
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="email adress"
                id="email"
                name="email"
                isError={!!errors.email}
                messageError={errors.email}
              />
            </section>
            <section>
              <Label htmlFor="umur" title="umur" />
              <Select
                value={values.umur}
                onBlur={handleBlur}
                id="umur"
                name="umur"
                options={option}
                isError={!!errors.umur}
                messageError={errors.umur}
                onChange={handleChange}
              />
            </section>
            <section>
              <Label htmlFor="tanggal_lahir" title="tanggal lahir" />
              <InputText
                onChange={handleChange}
                onBlur={formik.handleBlur}
                value={values.tanggal_lahir}
                placeholder="tanggal lahir"
                id="tanggal_lahir"
                name="tanggal_lahir"
                type="date"
                isError={!!errors.tanggal_lahir}
                messageError={errors.tanggal_lahir}
              />
            </section>
            <section>
              <Label htmlFor="status" title="status" />
              <InputText
                onBlur={formik.handleBlur}
                onChange={handleChange}
                value={values.status}
                placeholder="status"
                id="status"
                name="status"
                isError={!!errors.status}
                messageError={errors.status}
              />
            </section>
            <section className="flex gap-3 flex-col">
              <Button width="lg1" title="Simpan" colorSchema="dark" />
              <Link href={"/user"}>
                <Button
                  width="lg1"
                  type="button"
                  title="Cancel"
                  colorSchema="red"
                />
              </Link>
            </section>
          </Form>
        </FormikProvider>
      </section>
    </section>
  );
};

export default CreateUser;
