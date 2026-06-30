import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronRight, ChevronLeft, User, MapPin, CreditCard, FileText, Upload } from 'lucide-react';
import hiloniLogo from '@assets/hiloni_logo.jpg';
import { Link } from 'wouter';

const STEPS = [
  { id: 1, label: 'Personal', icon: User },
  { id: 2, label: 'Contact', icon: MapPin },
  { id: 3, label: 'Financial', icon: CreditCard },
  { id: 4, label: 'Documents', icon: FileText },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = current > step.id;
        const active = current === step.id;
        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${done ? 'bg-primary border-primary text-white' : active ? 'bg-white border-primary text-primary shadow-lg shadow-primary/20' : 'bg-white border-border text-muted-foreground'}`}>
                {done ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-label font-semibold tracking-wide ${active ? 'text-primary' : done ? 'text-primary' : 'text-muted-foreground'}`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mb-5 transition-all duration-500 ${done ? 'bg-primary' : 'bg-border'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{children}</div>;
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-xs font-label font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
const selectCls = inputCls + " appearance-none cursor-pointer";

function Step1({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <FieldGroup>
        <Field label="First Name">
          <input className={inputCls} placeholder="e.g. Rajesh" value={data.firstName || ''} onChange={e => onChange('firstName', e.target.value)} />
        </Field>
        <Field label="Last Name">
          <input className={inputCls} placeholder="e.g. Patel" value={data.lastName || ''} onChange={e => onChange('lastName', e.target.value)} />
        </Field>
        <Field label="Date of Birth">
          <input type="date" className={inputCls} value={data.dob || ''} onChange={e => onChange('dob', e.target.value)} />
        </Field>
        <Field label="Gender">
          <select className={selectCls} value={data.gender || ''} onChange={e => onChange('gender', e.target.value)}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Father's Name">
          <input className={inputCls} placeholder="e.g. Suresh Patel" value={data.fatherName || ''} onChange={e => onChange('fatherName', e.target.value)} />
        </Field>
        <Field label="Marital Status">
          <select className={selectCls} value={data.maritalStatus || ''} onChange={e => onChange('maritalStatus', e.target.value)}>
            <option value="">Select status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
            <option>Widowed</option>
          </select>
        </Field>
        <Field label="Nationality" full>
          <select className={selectCls} value={data.nationality || 'Indian'} onChange={e => onChange('nationality', e.target.value)}>
            <option>Indian</option>
            <option>NRI</option>
            <option>PIO/OCI</option>
          </select>
        </Field>
      </FieldGroup>
    </div>
  );
}

function Step2({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <FieldGroup>
        <Field label="Mobile Number">
          <input className={inputCls} placeholder="+91 98765 43210" value={data.mobile || ''} onChange={e => onChange('mobile', e.target.value)} />
        </Field>
        <Field label="Email Address">
          <input type="email" className={inputCls} placeholder="rajesh@example.com" value={data.email || ''} onChange={e => onChange('email', e.target.value)} />
        </Field>
        <Field label="Address Line 1" full>
          <input className={inputCls} placeholder="House / Flat / Block No." value={data.address1 || ''} onChange={e => onChange('address1', e.target.value)} />
        </Field>
        <Field label="Address Line 2" full>
          <input className={inputCls} placeholder="Street / Colony / Locality" value={data.address2 || ''} onChange={e => onChange('address2', e.target.value)} />
        </Field>
        <Field label="City">
          <input className={inputCls} placeholder="e.g. Ahmedabad" value={data.city || ''} onChange={e => onChange('city', e.target.value)} />
        </Field>
        <Field label="State">
          <select className={selectCls} value={data.state || ''} onChange={e => onChange('state', e.target.value)}>
            <option value="">Select state</option>
            {['Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'West Bengal', 'Telangana', 'Andhra Pradesh', 'Kerala', 'Punjab', 'Haryana', 'Other'].map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="PIN Code">
          <input className={inputCls} placeholder="e.g. 380009" maxLength={6} value={data.pin || ''} onChange={e => onChange('pin', e.target.value)} />
        </Field>
        <Field label="Country">
          <input className={inputCls} value="India" readOnly />
        </Field>
      </FieldGroup>
    </div>
  );
}

function Step3({ data, onChange }: { data: Record<string, string>; onChange: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <FieldGroup>
        <Field label="PAN Number">
          <input className={inputCls} placeholder="ABCDE1234F" maxLength={10} value={data.pan || ''} onChange={e => onChange('pan', e.target.value.toUpperCase())} />
        </Field>
        <Field label="Aadhaar Number">
          <input className={inputCls} placeholder="XXXX XXXX XXXX" maxLength={14} value={data.aadhaar || ''} onChange={e => onChange('aadhaar', e.target.value)} />
        </Field>
        <Field label="Bank Account Number">
          <input className={inputCls} placeholder="Account number" value={data.bankAccount || ''} onChange={e => onChange('bankAccount', e.target.value)} />
        </Field>
        <Field label="IFSC Code">
          <input className={inputCls} placeholder="e.g. SBIN0001234" value={data.ifsc || ''} onChange={e => onChange('ifsc', e.target.value.toUpperCase())} />
        </Field>
        <Field label="Bank Name">
          <input className={inputCls} placeholder="e.g. State Bank of India" value={data.bankName || ''} onChange={e => onChange('bankName', e.target.value)} />
        </Field>
        <Field label="Account Type">
          <select className={selectCls} value={data.accountType || ''} onChange={e => onChange('accountType', e.target.value)}>
            <option value="">Select type</option>
            <option>Savings</option>
            <option>Current</option>
          </select>
        </Field>
        <Field label="Annual Income">
          <select className={selectCls} value={data.income || ''} onChange={e => onChange('income', e.target.value)}>
            <option value="">Select range</option>
            <option>Below ₹1 Lakh</option>
            <option>₹1–5 Lakh</option>
            <option>₹5–10 Lakh</option>
            <option>₹10–25 Lakh</option>
            <option>₹25 Lakh–1 Cr</option>
            <option>Above ₹1 Cr</option>
          </select>
        </Field>
        <Field label="Trading Experience">
          <select className={selectCls} value={data.experience || ''} onChange={e => onChange('experience', e.target.value)}>
            <option value="">Select experience</option>
            <option>Less than 1 year</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>More than 5 years</option>
          </select>
        </Field>
        <Field label="Segments Interested In" full>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
            {['Equity', 'F&O', 'Commodity', 'Currency', 'Mutual Funds', 'Bonds'].map(seg => (
              <label key={seg} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input type="checkbox" className="accent-primary w-4 h-4" />
                {seg}
              </label>
            ))}
          </div>
        </Field>
      </FieldGroup>
    </div>
  );
}

function DocUploadBox({ label, note }: { label: string; note: string }) {
  const [file, setFile] = useState<string | null>(null);
  return (
    <div className="border-2 border-dashed border-border rounded-xl p-5 hover:border-primary/40 transition-colors group">
      <label className="cursor-pointer block">
        <input type="file" className="hidden" accept="image/*,.pdf" onChange={e => {
          if (e.target.files?.[0]) setFile(e.target.files[0].name);
        }} />
        <div className="flex flex-col items-center text-center">
          {file ? (
            <>
              <CheckCircle className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold text-primary">{file}</p>
              <p className="text-xs text-muted-foreground mt-1">Click to change</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{note}</p>
              <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-label font-semibold">Upload File</span>
            </>
          )}
        </div>
      </label>
    </div>
  );
}

function Step4() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-2">Upload clear scans or photos. Accepted formats: JPG, PNG, PDF. Max 5MB per file.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DocUploadBox label="PAN Card" note="Front side, clearly visible" />
        <DocUploadBox label="Aadhaar Card" note="Both sides (front & back)" />
        <DocUploadBox label="Passport Photo" note="White background, recent" />
        <DocUploadBox label="Signature" note="On white paper, scanned" />
        <DocUploadBox label="Bank Statement / Cancelled Cheque" note="Last 3 months or cancelled cheque" />
        <DocUploadBox label="Income Proof (Optional)" note="ITR / Salary slip" />
      </div>
    </div>
  );
}

function Success({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-3">Application Submitted</h2>
      <p className="text-muted-foreground mb-2 max-w-md mx-auto">
        Thank you{name ? `, ${name}` : ''}! Your Demat account application has been received. Our team will contact you within 24–48 business hours.
      </p>
      <div className="mt-6 p-5 bg-muted/30 rounded-2xl border border-border max-w-sm mx-auto text-left space-y-2">
        <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-3">What happens next?</p>
        {['KYC verification (1–2 working days)', 'In-person / video IPV verification', 'Demat & trading account activation', 'Welcome call from your dedicated RM'].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{i + 1}</div>
            <span className="text-sm text-foreground">{step}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-white text-sm font-label font-semibold hover:bg-foreground/90 transition-colors">
          Back to Home
        </Link>
        <a href="tel:+919327012653" className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-border text-sm font-label font-semibold text-foreground hover:border-primary/30 transition-colors">
          Call Privilege Desk
        </a>
      </div>
    </motion.div>
  );
}

export default function OpenAccount() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const updateField = (k: string, v: string) => setFormData(prev => ({ ...prev, [k]: v }));

  const next = () => {
    if (step < 4) setStep(s => s + 1);
    else setDone(true);
  };
  const prev = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src={hiloniLogo} alt="Hiloni Broking" className="h-9 w-auto object-contain cursor-pointer" />
          </Link>
          <div className="text-right">
            <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider">Open Demat Account</p>
            <p className="text-xs text-muted-foreground">SEBI Reg. INZ000205632</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {!done ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-foreground">Open Your Demat Account</h1>
              <p className="text-muted-foreground mt-2">Complete KYC in 4 simple steps. Takes under 10 minutes.</p>
            </div>

            <StepIndicator current={step} />

            <div className="bg-white rounded-3xl border border-border shadow-xl shadow-foreground/5 p-8">
              <h2 className="text-lg font-bold text-foreground mb-6">
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Contact & Address'}
                {step === 3 && 'Financial & Bank Details'}
                {step === 4 && 'Document Upload'}
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && <Step1 data={formData} onChange={updateField} />}
                  {step === 2 && <Step2 data={formData} onChange={updateField} />}
                  {step === 3 && <Step3 data={formData} onChange={updateField} />}
                  {step === 4 && <Step4 />}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-10 pt-6 border-t border-border">
                {step > 1 ? (
                  <button onClick={prev} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-border text-sm font-label font-semibold text-foreground hover:border-primary/30 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-border text-sm font-label font-semibold text-foreground hover:border-primary/30 transition-colors">
                    <ChevronLeft className="w-4 h-4" /> Home
                  </Link>
                )}
                <button onClick={next} className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-primary text-white text-sm font-label font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                  {step === 4 ? 'Submit Application' : 'Continue'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Investment in securities market are subject to market risk. Read all the related documents carefully before investing.
            </p>
          </>
        ) : (
          <Success name={formData.firstName || ''} />
        )}
      </div>
    </div>
  );
}
