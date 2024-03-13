import React from "react"
import { ErrorMessage, useField } from "formik"

const NormalInput = (props) => {
    const [field, meta] = useField(props)

    return (
        <div 
        // className={`${styles.input} ${meta.touched && meta.error ? styles.error : "" }`}
        >
            <div>
            <label htmlFor={props.for}>{props.labeltext}</label></div>
            <div>
            <input type={field.type} name={field.name} {...field} {...props} /></div>
            <div 
            // className={styles.errortext}
             >
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}

export default NormalInput