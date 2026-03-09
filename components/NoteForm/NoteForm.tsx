import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote } from "../../lib/api";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";

interface NoteFormProps{
    onClose: () => void;
}

const schema = Yup.object({
    title: Yup.string().min(3).max(50).required(),
    content: Yup.string().max(500),
    tag: Yup.string().required(),
});

export default function NoteForm({ onClose }:NoteFormProps ) {
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        }
    })
    
    return (
        <Formik initialValues={{
            title: "",
            content: "",
            tag: "Todo",
        }}
            validationSchema={schema}
            onSubmit={(values) => mutation.mutate(values)}>
            
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage component={"span"} name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field as="textarea"
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage component={"span"} name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select" id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage component={"span"} name="tag" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={false}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    );
};