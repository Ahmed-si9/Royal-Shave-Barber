import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { API, BOOKING_SERVICES } from "../lib/site";

const EMPTY = { name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" };

const fieldCls =
  "h-12 rounded-none border-gold-hairline bg-black/40 px-4 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-gold";

export default function BookingForm() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e?.target ? e.target.value : e });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, email: form.email || null, notes: form.notes || null };
      const { data } = await axios.post(`${API}/bookings`, payload);
      setConfirmed(data.booking);
      toast.success("Booking request received");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Could not submit booking — please call us instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-gold-hairline bg-charcoal p-8 md:p-10" data-testid="booking-form-card">
      <AnimatePresence mode="wait">
        {confirmed ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-col items-start gap-5"
            data-testid="booking-confirmation"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
              <Check size={26} />
            </span>
            <h3 className="font-display text-3xl text-white">You're on the books.</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              Thanks {confirmed.name} — we've received your request for a{" "}
              <span className="text-gold">{confirmed.service}</span> on{" "}
              <span className="text-white">{confirmed.date}</span> at{" "}
              <span className="text-white">{confirmed.time}</span>. We'll confirm shortly by phone.
            </p>
            <p className="text-[10px] tracking-[0.3em] text-zinc-600">
              REF · {confirmed.id.slice(0, 8).toUpperCase()}
            </p>
            <button
              data-testid="booking-again-button"
              onClick={() => {
                setConfirmed(null);
                setForm(EMPTY);
              }}
              className="mt-2 border border-gold-hairline px-6 py-3 text-xs font-semibold tracking-[0.25em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-coal"
            >
              MAKE ANOTHER BOOKING
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
            data-testid="booking-form"
          >
            <h3 className="mb-2 font-display text-3xl text-white">Book Your Chair</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                data-testid="booking-name-input"
                required
                minLength={2}
                placeholder="Full name"
                value={form.name}
                onChange={set("name")}
                className={fieldCls}
              />
              <Input
                data-testid="booking-phone-input"
                required
                minLength={6}
                placeholder="Phone"
                value={form.phone}
                onChange={set("phone")}
                className={fieldCls}
              />
            </div>
            <Input
              data-testid="booking-email-input"
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={set("email")}
              className={fieldCls}
            />
            <Select required value={form.service} onValueChange={set("service")}>
              <SelectTrigger data-testid="booking-service-select" className={fieldCls}>
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-gold-hairline bg-[#141414] text-white">
                {BOOKING_SERVICES.map((s) => (
                  <SelectItem
                    key={s}
                    value={s}
                    data-testid={`booking-service-option-${s.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="focus:bg-gold focus:text-coal"
                  >
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                data-testid="booking-date-input"
                required
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={form.date}
                onChange={set("date")}
                className={`${fieldCls} [color-scheme:dark]`}
              />
              <Input
                data-testid="booking-time-input"
                required
                type="time"
                min="09:00"
                max="18:30"
                value={form.time}
                onChange={set("time")}
                className={`${fieldCls} [color-scheme:dark]`}
              />
            </div>
            <Textarea
              data-testid="booking-notes-input"
              placeholder="Notes for your barber (optional)"
              value={form.notes}
              onChange={set("notes")}
              maxLength={500}
              className="min-h-[96px] rounded-none border-gold-hairline bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-gold"
            />
            <button
              data-testid="booking-submit-button"
              type="submit"
              disabled={submitting}
              className="group relative mt-2 overflow-hidden border border-gold bg-gold py-4 text-xs font-bold tracking-[0.3em] text-coal transition-colors duration-500 hover:text-gold disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-coal transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center justify-center gap-2">
                {submitting && <Loader2 size={14} className="animate-spin" />}
                {submitting ? "SECURING YOUR CHAIR…" : "CONFIRM BOOKING"}
              </span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
