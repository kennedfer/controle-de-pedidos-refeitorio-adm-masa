import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
