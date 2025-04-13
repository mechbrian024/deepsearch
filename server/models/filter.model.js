import mongoose, { connect } from "mongoose";

const FilterLineSchema = new mongoose.Schema({ 
  field:{
    type: String,
    required: true,
  },
  value:{
    type: String,
    required: true,
  },
  connector:{
    type: String,
    required: false,
  },
  condition: {
    type: String,
    required: false,
  }
});

const FilterBlockSchema = new mongoose.Schema({
  filterLines: {
    type: [FilterLineSchema],
    required: true,
  }
});

const FilterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  filterBlocks: {
    type: [FilterBlockSchema],
    required: true,
  },
});

export default mongoose.model("Filter", FilterSchema);
