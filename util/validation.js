import validatejs from "validate.js";

const validationDictionary = {
  bool: {
    presence: { allowEmpty: false, message: "^is required" },
  },

  day: {
    presence: { allowEmpty: false, message: "^is required" },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: "^is notValid",
    },
  },

  name: {
    presence: { allowEmpty: false, message: "^is required" },
  },
  first_name: {
    presence: { allowEmpty: false, message: "^is required" },
  },
  last_name: {
    presence: { allowEmpty: false, message: "^is required" },
  },
  email: {
    presence: { allowEmpty: false, message: "^is required" },
    email: { message: "^is notValid" },
  },

  genericRequired: {
    presence: { allowEmpty: false, message: "^is required" },
  },

  generic: {
    presence: { allowEmpty: true, message: "^is required" },
  },

  integer: {
    presence: { allowEmpty: true, message: "^is required" },
    numericality: { greaterThan: -1, onlyInteger: true, message: "^notValid" },
  },

  integerRequired: {
    presence: { allowEmpty: false, message: "^is required" },
    numericality: {
      greaterThan: -1,
      onlyInteger: true,
      message: "^is notValid",
    },
  },

  month: {
    presence: { allowEmpty: false, message: "^is required" },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 12,
      message: "^is notValid",
    },
  },

  password: {
    presence: { allowEmpty: false, message: "^is required" },
    length: { minimum: 4, message: "^is tooShort" },
  },

  confirmPassword: {
    presence: { allowEmpty: false, message: "^is required" },
    equality: {
      attribute: "password",
      message: "^doesntMatch",
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2);
        console.log("v1", v1, v2);
      },
    },
  },

  phone: {
    presence: { allowEmpty: false, message: "^is required" },
    format: {
      pattern: /^[2-9]\d{2}-\d{3}-\d{4}$/,
      message: "^Phone number must be valid",
    },
  },

  state: {
    presence: { allowEmpty: false, message: "^is required" },
    inclusion: {
      within: ["AK", "AL", "AR"],
      message: "^is notValid",
    },
  },

  zip: {
    presence: { allowEmpty: false, message: "^is required" },
    length: { is: 5, message: "^Zip must be 5 digits long" },
  },
  nationalID: {
    presence: { allowEmpty: true, message: "^is required" },
    length: { is: 5, message: "^id no. must be 10 digits" },
  },
};

function onInputChange({
  field,
  value,
  obj = "inputs",
  onChangeValidation = false,
  cb = () => {},
}) {
  const inputs = this.state[obj];
  this.setState(
    {
      [obj]: {
        ...inputs,
        [field]: getInputValidationState({
          input: inputs[field],
          value,
          onChangeValidation,
        }),
      },
    },
    cb
  );
}

function getInputValidationState({ input, value, onChangeValidation = true }) {
  return {
    ...input,
    value,
    error:
      input.optional || !onChangeValidation
        ? null
        : validateInput({ type: input.type, value }),
  };
}

function validateInput({ type, value }) {
  const result = validatejs(
    {
      [type]: value,
    },
    {
      [type]: validationDictionary[type],
    }
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

function getFormValidation({ obj = "inputs" }) {
  const inputs = this.state[obj];

  const updatedInputs = {};
  let validForm = true;

  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key] = getInputValidationState({
      input,
      value: input.value,
    });
    if (updatedInputs[key].error && validForm) validForm = false;
  }

  this.setState({
    [obj]: updatedInputs,
    validForm: validForm,
  });
}

function renderError(obj, field, fieldName, toast) {
  const { errorStyle } = this.props;
  const inputs = this.state[obj];
  if (inputs[field].error) {
    let err = `${fieldName} ${inputs[field].error}`;
    if (toast) {
      showToast(err, "danger");
    } else {
      return err;
    }
  }
  return null;
}

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation,
  renderError,
};
