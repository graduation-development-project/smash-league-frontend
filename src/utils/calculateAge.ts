export const calculateAge = (dob: Date | string | null | undefined ): number => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Kiểm tra nếu chưa đến sinh nhật trong năm nay thì trừ 1 tuổi
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};
