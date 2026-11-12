import React, { useState, useEffect } from 'react';
import { EnquiryFormData, FormErrors } from '../../types';
import { Send, CheckCircle2, AlertCircle, Loader2, PhoneCall, ArrowRight, MessageCircle } from 'lucide-react';

interface EnquiryFormProps {
  initialCourse?: string;
  initialMode?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialCourse = '',
  initialMode = '',
  onSuccess,
  isCompact = false,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    course: initialCourse,
    preferredMode: initialMode,
    message: '',
    website: '', // honeypot
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    enquiryId?: string;
    message?: string;
    whatsappUrl?: string;
  } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCourse) {
      setFormData((prev) => ({ ...prev, course: initialCourse }));
    }
    if (initialMode) {
      setFormData((prev) => ({ ...prev, preferredMode: initialMode }));
    }
  }, [initialCourse, initialMode]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.';
    }

    const cleanedMobile = formData.mobileNumber.trim().replace(/^(\+91|0)/, '').replace(/\s+/g, '');
    const indianMobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!indianMobileRegex.test(cleanedMobile)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a discipline or course.';
    }

    if (!formData.preferredMode) {
      newErrors.preferredMode = 'Please select your preferred training mode.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      console.warn('Bot detected via honeypot.');
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      let result: any = null;

      try {
        const response = await fetch('/api/enquire', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            mobileNumber: formData.mobileNumber.trim(),
            email: formData.email.trim(),
            course: formData.course,
            preferredMode: formData.preferredMode,
            message: formData.message.trim(),
            website: formData.website,
          }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const json = await response.json();
          if (response.ok && json.success) {
            result = json;
          } else if (json.errors) {
            setErrors(json.errors);
            setIsSubmitting(false);
            return;
          }
        }
      } catch (networkOrApiErr) {
        // In static hosting environments like Vercel or GitHub Pages, proceed directly to WhatsApp
        console.warn('API route unavailable on current host; proceeding directly to WhatsApp dispatch.', networkOrApiErr);
      }

      const generatedRefId = result?.enquiryId || `GVD-${Date.now().toString().slice(-6)}`;

      // Format direct WhatsApp dispatch message for official admissions desk (+91 96553 64707)
      const whatsappLines = [
        `*NEW ADMISSION ENQUIRY — GV DESIGN TECH*`,
        ``,
        `*Student Name:* ${formData.fullName.trim()}`,
        `*Mobile Number:* ${formData.mobileNumber.trim()}`,
        formData.email.trim() ? `*Email:* ${formData.email.trim()}` : null,
        `*Course Selected:* ${formData.course}`,
        `*Preferred Schedule:* ${formData.preferredMode}`,
        formData.message.trim() ? `*Student Note:* ${formData.message.trim()}` : null,
        `*Enquiry Ref ID:* ${generatedRefId}`,
        ``,
        `_Transmitted via GV DESIGN TECH Official Admissions Desk (Oddanchatram)_`
      ].filter(Boolean).join('\n');

      const waUrl =
        result?.whatsappUrl ||
        `https://wa.me/919655364707?text=${encodeURIComponent(whatsappLines)}`;

      // Automatically dispatch / open WhatsApp in app or new tab
      if (typeof window !== 'undefined') {
        try {
          const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
          if (isMobile) {
            // Direct deep link on mobile opens the native WhatsApp app directly
            window.location.href = waUrl;
          } else {
            window.open(waUrl, '_blank');
          }
        } catch (e) {
          console.warn('Auto redirect restricted by browser; user can tap the direct WhatsApp button.', e);
        }
      }

      setSubmitSuccess(true);
      setConfirmationData({
        enquiryId: generatedRefId,
        message: result?.message || 'Your enquiry has been formatted and is ready for our WhatsApp admissions desk.',
        whatsappUrl: waUrl,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Enquiry submission error:', err);
      setApiError(
        err.message ||
          'Unable to connect to the enquiry service. You can call our institute directly at +91 96553 64707.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      course: '',
      preferredMode: '',
      message: '',
      website: '',
    });
    setSubmitSuccess(false);
    setConfirmationData(null);
    setErrors({});
    setApiError(null);
  };

  if (submitSuccess) {
    return (
      <div className="bg-[#FAF9F7] border border-[#E5E5E2] rounded-lg p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-editorial text-2xl font-normal text-neutral-950">
          Enquiry Registered &amp; Ready for WhatsApp
        </h3>
        <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          {confirmationData?.message ||
            'Your enquiry has been registered with GV DESIGN TECH in Oddanchatram. All details have been pre-formatted for direct transmission to our WhatsApp admissions desk.'}
        </p>

        {confirmationData?.enquiryId && (
          <div className="inline-block bg-white border border-[#E5E5E2] px-4 py-2 rounded text-xs font-mono text-neutral-700">
            Reference ID: <span className="font-bold text-[#DC2626]">{confirmationData.enquiryId}</span>
          </div>
        )}

        {/* Dedicated Direct WhatsApp Action Card */}
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2.5 max-w-md mx-auto text-left shadow-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
              DIRECT WHATSAPP DISPATCH (+91 96553 64707)
            </span>
          </div>
          <p className="text-xs text-neutral-700 leading-relaxed">
            WhatsApp has been opened in a new tab. If it did not open automatically, tap the button below to send your enquiry directly to our technical counselors:
          </p>
          <a
            href={confirmationData?.whatsappUrl || 'https://wa.me/919655364707'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>SEND VIA WHATSAPP (+91 96553 64707)</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-neutral-50 text-neutral-900 font-mono text-xs uppercase tracking-wider rounded border border-[#E5E5E2] transition-colors"
          >
            Submit Another Enquiry
          </button>
          <a
            href="tel:+919655364707"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Call +91 96553 64707
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave blank</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {apiError && (
        <div className="p-3.5 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-600" />
          <div>
            <p className="font-bold">Unable to submit enquiry</p>
            <p className="mt-0.5">{apiError}</p>
          </div>
        </div>
      )}

      {/* Row 1: Full Name & Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-fullName" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
            Full Name <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id="enquiry-fullName"
            type="text"
            name="fullName"
            autoComplete="name"
            placeholder="e.g. Anandha Kumar"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded border text-sm text-neutral-900 bg-[#FAF9F7] placeholder-neutral-400 focus:bg-white focus:outline-none transition-colors ${
              errors.fullName
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-[#E5E5E2] focus:border-neutral-900'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-mobileNumber" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
            Phone Number <span className="text-[#DC2626]">*</span>
          </label>
          <input
            id="enquiry-mobileNumber"
            type="tel"
            name="mobileNumber"
            autoComplete="tel"
            placeholder="10-digit Mobile Number"
            maxLength={10}
            value={formData.mobileNumber}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded border text-sm text-neutral-900 bg-[#FAF9F7] placeholder-neutral-400 focus:bg-white focus:outline-none transition-colors ${
              errors.mobileNumber
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-[#E5E5E2] focus:border-neutral-900'
            }`}
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Discipline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-email" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
            Email Address
          </label>
          <input
            id="enquiry-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="e.g. anand@domain.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded border text-sm text-neutral-900 bg-[#FAF9F7] placeholder-neutral-400 focus:bg-white focus:outline-none transition-colors ${
              errors.email
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-[#E5E5E2] focus:border-neutral-900'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-course" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
            Select Discipline <span className="text-[#DC2626]">*</span>
          </label>
          <select
            id="enquiry-course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 rounded border text-sm text-neutral-900 bg-[#FAF9F7] focus:bg-white focus:outline-none transition-colors ${
              errors.course
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-[#E5E5E2] focus:border-neutral-900'
            }`}
          >
            <option value="">Select Course / Discipline</option>
            <optgroup label="01 — Mechanical & Automobile">
              <option value="AutoCAD">AutoCAD (Mechanical & 2D Drafting)</option>
              <option value="SolidWorks">SolidWorks (3D CAD & Modeling)</option>
              <option value="Creo PTC">Creo PTC</option>
              <option value="CATIA">CATIA (Automotive & Aerospace)</option>
              <option value="Mastercam">Mastercam</option>
              <option value="SolidCAM">SolidCAM</option>
              <option value="GD&T">GD&T (ASME Y14.5 Tolerancing)</option>
              <option value="GD&T (Geometric Dimensioning & Tolerancing)">GD&T (Geometric Dimensioning & Tolerancing)</option>
              <option value="Reverse Engineering">Reverse Engineering</option>
              <option value="Automobile Engineering">Automobile Engineering</option>
              <option value="Mechanical & Automobile Design">Mechanical & Automobile Design</option>
            </optgroup>
            <optgroup label="02 — Civil Engineering">
              <option value="Civil Engineering Software & Technical Training">Civil Engineering Software & Technical Training</option>
              <option value="Civil Engineering Software Training">Civil Engineering Software Training</option>
            </optgroup>
            <optgroup label="03 — CNC Programming">
              <option value="CNC Programming & Machining">CNC Programming & Machining</option>
              <option value="CNC Programming & Related Technical Training">CNC Programming & Related Technical Training</option>
            </optgroup>
            <optgroup label="04 — Computer Science & IT">
              <option value="C Programming">C Programming</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="Django">Django</option>
              <option value="MySQL">MySQL</option>
              <option value="HTML">HTML</option>
              <option value="Frontend Development">Frontend Development</option>
            </optgroup>
            <optgroup label="05 — Multimedia & Graphic Design">
              <option value="Adobe Photoshop">Adobe Photoshop</option>
              <option value="Adobe XD">Adobe XD</option>
              <option value="Figma">Figma</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Adobe Illustrator">Adobe Illustrator</option>
            </optgroup>
            <optgroup label="06 — Arts & Multimedia">
              <option value="Arts & Creative Multimedia">Arts & Creative Multimedia</option>
              <option value="Creative Design & Multimedia-Related Training">Creative Design & Multimedia-Related Training</option>
            </optgroup>
            <optgroup label="General">
              <option value="General Technical Enquiry">General Technical Guidance</option>
            </optgroup>
          </select>
          {errors.course && (
            <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.course}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Preferred Learning Mode */}
      <div>
        <label htmlFor="enquiry-preferredMode" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
          Preferred Online Batch Schedule <span className="text-[#DC2626]">*</span>
        </label>
        <select
          id="enquiry-preferredMode"
          name="preferredMode"
          value={formData.preferredMode}
          onChange={handleChange}
          className={`w-full px-3.5 py-2.5 rounded border text-sm text-neutral-900 bg-[#FAF9F7] focus:bg-white focus:outline-none transition-colors ${
            errors.preferredMode
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-[#E5E5E2] focus:border-neutral-900'
          }`}
        >
          <option value="">Select Preferred Online Batch</option>
          <option value="Live Online — Weekday Evening Batch">Live Online — Weekday Evening Batch (Mon–Fri)</option>
          <option value="Live Online — Weekend Intensive Batch">Live Online — Weekend Intensive Batch (Sat–Sun)</option>
          <option value="Live Online — 1:1 Flexible Slot">Live Online — 1:1 Flexible Mentorship Slot</option>
        </select>
        {errors.preferredMode && (
          <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.preferredMode}
          </p>
        )}
      </div>

      {/* Row 4: Message */}
      <div>
        <label htmlFor="enquiry-message" className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
          Message / Questions for the Instructor <span className="text-neutral-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={3}
          placeholder="Mention your background, branch of study, specific software requirements, or convenient hours..."
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 rounded border border-[#E5E5E2] text-sm text-neutral-900 bg-[#FAF9F7] placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-neutral-900 transition-colors font-sans"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>CONNECTING TO WHATSAPP...</span>
          </>
        ) : (
          <>
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>SUBMIT &amp; SEND VIA WHATSAPP</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[10px] font-mono text-neutral-400 text-center">
        Oddanchatram Admissions Desk • We respond within working hours (Mon–Sat 9AM–9PM)
      </p>
    </form>
  );
};
