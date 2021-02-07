import * as React from 'react';
import styled from 'styled-components';
import {
  Field,
  reduxForm,
  InjectedFormProps,
  WrappedFieldProps,
  FieldArray,
  WrappedFieldArrayProps,
} from 'redux-form';

interface FormValues {
  name: string;
  alpha2Code: string;
  callingCodes: string[];
  capital: string;
  region: string;
}

interface RenderFieldProps extends WrappedFieldProps {
  type: string;
  label: string;
}

/** 생성 폼 */
const CreateForm = ({
  handleSubmit,
}: InjectedFormProps<FormValues, unknown, string | string[]>) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Field name="name" component={renderField} type="text" label="name" />
      <Field
        name="alpha2Code"
        component={renderField}
        type="text"
        label="alpha2Code"
      />
      <FieldArray name="callingCodes" component={renderFields} />
      <Field
        name="capital"
        component={renderField}
        type="text"
        label="capital"
      />
      <Field name="region" component={renderField} type="text" label="region" />
      <SubmitButton type="submit">제출</SubmitButton>
    </Form>
  );
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
}: RenderFieldProps) => (
  <FormItem>
    <Input {...input} placeholder={label} type={type} />
    {touched && error && <ErrorMessage>{error}</ErrorMessage>}
  </FormItem>
);

const renderFields = ({ fields }: WrappedFieldArrayProps) => {
  return (
    <div>
      {fields.map((name, index) => (
        <div key={index}>
          <Field
            name={name}
            type="text"
            component={renderField}
            label="callingCodes"
          />
        </div>
      ))}
      <FormFieldAddButton type="button" onClick={() => fields.push(undefined)}>
        callingCodes 추가
      </FormFieldAddButton>
    </div>
  );
};

const Form = styled.form`
  display: inline-block;
  margin-bottom: 20px;
`;

const FormItem = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 200px;
  height: 20px;
  padding: 5px 7px;
  border: 1px solid #999;
  border-radius: 5px;
  font-size: 1.2rem;
`;

const SubmitButton = styled.button``;

const ErrorMessage = styled.div`
  margin-top: 5px;
  padding: 0px 5px;
  color: red;
`;

const FormFieldAddButton = styled.button`
  margin-bottom: 10px;
`;

/** 유효성 검사 함수 */
const validate = (values: FormValues) => {
  const errors = {} as FormValues;
  if (!values.name) {
    errors.name = 'name은 필수입니다';
  }
  return errors;
};

export default reduxForm<FormValues, unknown, string | string[]>({
  form: 'create',
  validate,
})(CreateForm);
