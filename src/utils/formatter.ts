
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const formatQuantity = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatPhone = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format for Brazilian phone numbers
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  }
};

export const formatCPF = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format for Brazilian CPF
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  } else {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }
};

export const formatCEP = (value: string): string => {
  // Remove non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format for Brazilian CEP (postal code)
  if (numbers.length <= 5) {
    return numbers;
  } else {
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  }
};

export const formatMultiline = (text: string): JSX.Element => {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
};
