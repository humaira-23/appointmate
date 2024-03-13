import React from "react"
import { ErrorMessage, useField } from "formik"

const SigninInput = (props) => {
    const [field, meta] = useField(props)

    return (
        <div 
        // className={`${styles.input} ${meta.touched && meta.error ? styles.error : "" }`}
        >
            <input type={field.type} placeholder={props.placeholder} name={field.name} {...field} {...props} />
            <div 
            // className={styles.errortext}
             >
                <ErrorMessage name={field.name} />
            </div>
        </div>
    )
}

export default SigninInput