export const wakeUp = async (req, res) => {
  res.status(200).json({ mensaje: "despertando" });
};
