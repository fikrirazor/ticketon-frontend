import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ImageUpload } from '../ui/ImageUpload';
import { VoucherForm } from './VoucherForm';
import { Button } from '../ui/Button';
import { Calendar, Users, Layout } from 'lucide-react';

const CATEGORIES = ['Music', 'Workshop', 'Conference', 'Sport', 'Arts', 'Food'];

export interface VoucherValue {
  code: string;
  amount: number;
  expiryDate: string;
}

export interface EventFormValues {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  price: number;
  seatTotal: number;
  category: string;
  image: File | null;
  isPromotion: boolean;
  vouchers: VoucherValue[];
}

const EventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  startDate: Yup.string().required('Start date is required'),
  endDate: Yup.string().required('End date is required'),
  price: Yup.number().min(0, 'Price cannot be negative').required('Price is required'),
  seatTotal: Yup.number().min(1, 'At least 1 seat is required').required('Total seats is required'),
  category: Yup.string().oneOf(CATEGORIES).required('Category is required'),
  isPromotion: Yup.boolean(),
  vouchers: Yup.array().of(
    Yup.object().shape({
      code: Yup.string().required('Code is required'),
      amount: Yup.number().min(1, 'Min 1%').max(100, 'Max 100%').required('Amount is required'),
      expiryDate: Yup.string().required('Expiry date is required'),
    })
  ),
});

interface EventFormProps {
  initialValues?: Partial<EventFormValues>;
  onSubmit: (values: EventFormValues) => void;
  onPreview: (values: EventFormValues) => void;
  isLoading?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({ initialValues, onSubmit, onPreview, isLoading }) => {
  const defaultValues: EventFormValues = {
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    startDate: initialValues?.startDate || '',
    endDate: initialValues?.endDate || '',
    location: initialValues?.location || '',
    price: initialValues?.price || 0,
    seatTotal: initialValues?.seatTotal || 0,
    category: initialValues?.category || 'Music',
    image: null,
    isPromotion: false,
    vouchers: [],
    ...initialValues,
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={EventSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue, handleBlur, handleChange }) => (
        <Form className="space-y-8 max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Event Title</label>
                <input
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Summer Music Festival 2024"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                    touched.title && errors.title ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {touched.title && errors.title && <span className="text-xs text-red-500">{errors.title as string}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <select
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white transition-all ${
                    touched.category && errors.category ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {touched.category && errors.category && <span className="text-xs text-red-500">{errors.category as string}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-gray-700">Location</label>
                <input
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Jakarta, Indonesia"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                    touched.location && errors.location ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                {touched.location && errors.location && <span className="text-xs text-red-500">{errors.location as string}</span>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <ImageUpload
                label="Event Image Cover"
                onChange={(file) => setFieldValue('image', file)}
                error={errors.image as string}
                touched={!!touched.image}
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Price (IDR)</label>
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                      touched.price && errors.price ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {touched.price && errors.price && <span className="text-xs text-red-500">{errors.price as string}</span>}
                </div>
                <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Total Seats</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <input
                type="number"
                name="seatTotal"
                value={values.seatTotal}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="100"
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                  touched.seatTotal && errors.seatTotal ? 'border-red-500' : 'border-gray-200'
                }`}
              />
            </div>
            {touched.seatTotal && errors.seatTotal && <span className="text-xs text-red-500">{errors.seatTotal as string}</span>}
          </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPromotion"
                  id="isPromotion"
                  checked={values.isPromotion}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded focus:ring-primary/20"
                />
                <label htmlFor="isPromotion" className="text-sm font-medium text-gray-700">
                  Enable Event Promotion (Vouchers)
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Start Date</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <input
                type="datetime-local"
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                  touched.startDate && errors.startDate ? 'border-red-500' : 'border-gray-200'
                }`}
                required
              />
            </div>
            {touched.startDate && errors.startDate && <span className="text-xs text-red-500">{errors.startDate as string}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">End Date</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <input
                type="datetime-local"
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${
                  touched.endDate && errors.endDate ? 'border-red-500' : 'border-gray-200'
                }`}
                required
              />
            </div>
            {touched.endDate && errors.endDate && <span className="text-xs text-red-500">{errors.endDate as string}</span>}
          </div>
        </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              placeholder="Provide a detailed description of your event..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none ${
                touched.description && errors.description ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {touched.description && errors.description && <span className="text-xs text-red-500">{errors.description as string}</span>}
          </div>

          {values.isPromotion && <VoucherForm />}

          {/* Validation Summary */}
          {Object.keys(errors).length > 0 && touched.title && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm font-bold text-red-700 mb-1">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-xs text-red-600">
                {Object.entries(errors).map(([key, val]) => (
                  <li key={key}>{val as string}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onPreview(values)}
              className="flex items-center gap-2"
            >
              <Layout className="w-4 h-4" /> Preview
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-white min-w-[150px]"
            >
              {isLoading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
