import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withFirebase } from '../Firebase';

import "./AddBusiness.css";

const AddBusiness = ({firebase}) => {

    function submitBusiness(values) {

        var newBusinessRef = firebase.firebase.businesses().doc();
        var userRef = firebase.firebase.users().doc(firebase.user.uid);

        console.log(firebase.user.uid)

        firebase.firebase.transaction(transaction => {
            console.log(userRef);
            return transaction.get(userRef).then(userDoc => {
                transaction.set(newBusinessRef, {
                   name: values.name,
                   businessName: values.businessName,
                   businessEmail: values.businessEmail,
                   businessAddress: values.businessAddress,
                   businessPhoneNumber: values.businessPhoneNumber,
                   einTin: values.einTin,
                   user: firebase.user.uid
               })                

               transaction.update(userRef, {
                      businessAccount: true,
                      businessId: newBusinessRef.id
                })
            })
        }).then(res => console.log(res)).catch(error => console.log(error))
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