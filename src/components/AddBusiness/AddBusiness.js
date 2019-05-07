import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withFirebase } from '../Firebase';

import "./AddBusiness.css";

const AddBusiness = ({firebase}) => {

    function submitBusiness(values) {
        
        console.log(values);
        firebase.firebase.businesses().add({
            name: values.name,
            businessName: values.businessName,
            businessEmail: values.businessEmail,
            businessAddress: values.businessAddress,
            businessPhoneNumber: values.businessPhoneNumber,
            einTin: values.einTin,
            user: firebase.user.uid
        }).then(() => {
            document.location = "/profile";
        });
    }

    return(
        <div className="add-business">
            <Formik
                initialValues={{ 
                    name: '',
                    businessName: '',
                    businessEmail: '',
                    businessAddress: '',
                    businessPhoneNumber: '',
                    einTin: '',
                }}

                onSubmit={(values) => {
                        console.log(values);
                        submitBusiness(values);
                    }
                }  
                >
                {({ isSubmitting }) => (
                    <Form>
                        <label>Name</label>
                        <Field type="input" name="name" />
                        <ErrorMessage name="name" component="div" />
                        <label>Business Email</label>
                        <Field type="input" name="businessEmail" />
                        <ErrorMessage name="businessEmail" component="div" />
                        <label>Business Name</label>
                        <Field type="input" name="businessName" />
                        <ErrorMessage name="businessName" component="div" />
                        <label>Business Address</label>
                        <Field type="input" name="businessAddress" />
                        <ErrorMessage name="businessAddress" component="div" />
                        <label>Business Phone Number</label>
                        <Field type="input" name="businessPhoneNumber" />
                        <ErrorMessage name="businessPhoneNumber" component="div" />
                        <label>Business EIN/TIN</label>
                        <Field type="input" name="einTin" />
                        <ErrorMessage name="einTin" component="div" />

                        <button type="submit" className="add-new-event" style={{marginTop: "2rem"}}>
                            Send Business for Review
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default withFirebase(AddBusiness);