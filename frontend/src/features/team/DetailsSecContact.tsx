import React, { useState } from "react";
import CustomSelect from "../../components/elements/CustomSelect";

interface FormFields {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    serviceType?: string;
    message?: string;
}

const customOption = [
    { id: 1, value: "Maintenance Service", label: "Maintenance Service" },
    { id: 2, value: "Lighting & Fixtures", label: "Lighting & Fixtures" },
    { id: 3, value: "Installing a Ceiling Fan", label: "Installing a Ceiling Fan" },
    { id: 4, value: "Commercial Services", label: "Commercial Services" },
    { id: 5, value: "Short Circuit Repair", label: "Short Circuit Repair" },
]

const initialFormState: FormFields = {
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
};

const validate = (fields: FormFields): FormErrors => {
    const errors: FormErrors = {};

    if (!fields.name.trim()) {
        errors.name = "Name is required.";
    } else if (fields.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters.";
    }

    if (!fields.email.trim()) {
        errors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!fields.phone.trim()) {
        errors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s\-().]{7,15}$/.test(fields.phone)) {
        errors.phone = "Please enter a valid phone number.";
    }

    if (!fields.serviceType) {
        errors.serviceType = "Please select a service type.";
    }

    if (!fields.message.trim()) {
        errors.message = "Message is required.";
    } else if (fields.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters.";
    }

    return errors;
};

const DetailsSecContact: React.FC = () => {
    const [formData, setFormData] = useState<FormFields>(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for the field being edited
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };
    const handleSelectChange = (value: string) => {
        if (value) {
            setFormData((prev) => ({ ...prev, serviceType: value }));
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitted(false);
            return;
        }
        setErrors({});
        setSubmitted(true);
        setFormData(initialFormState);
    };

    return (
        <section className="team-details-contact">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Contact Our Team
                    </h6>
                    <h3 className="section-title__title title-animation">Give Us A Message</h3>
                </div>

                <div className="team-details-contact__inner">
                    <form
                        className="contact-form-validated team-details-contact__form"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="row">

                            {/* Name */}
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="team-details-contact__input-box">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        aria-label="Your Name"
                                        aria-invalid={!!errors.name}
                                    />
                                    {errors.name && (
                                        <span className="form-error" role="alert">{errors.name}</span>
                                    )}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="team-details-contact__input-box">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        aria-label="Email Address"
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <span className="form-error" role="alert">{errors.email}</span>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="team-details-contact__input-box">
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        aria-label="Phone Number"
                                        aria-invalid={!!errors.phone}
                                    />
                                    {errors.phone && (
                                        <span className="form-error" role="alert">{errors.phone}</span>
                                    )}
                                </div>
                            </div>

                            {/* Service Type */}
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="team-details-contact__input-box">
                                    <div className="select-box">
                                        <CustomSelect
                                            value={formData.serviceType || customOption[0].value}
                                            onChange={(value) => handleSelectChange(value)}
                                            optionArray={customOption}
                                        />

                                    </div>
                                    {errors.serviceType && (
                                        <span className="form-error" role="alert">{errors.serviceType}</span>
                                    )}
                                </div>
                            </div>

                            {/* Message + Submit */}
                            <div className="col-xl-12">
                                <div className="team-details-contact__input-box text-message-box">
                                    <textarea
                                        name="message"
                                        placeholder="Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        aria-label="Message"
                                        aria-invalid={!!errors.message}
                                    />
                                    {errors.message && (
                                        <span className="form-error" role="alert">{errors.message}</span>
                                    )}
                                </div>
                                <div className="team-details-contact__btn-box">
                                    <button type="submit" className="thm-btn">
                                        Send a Message
                                        <span className="icon-arrow-right"></span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>

                    <div className="result" role="status" aria-live="polite">
                        {submitted && (
                            <p className="form-success">
                                Thank you! Your message has been sent successfully.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsSecContact;