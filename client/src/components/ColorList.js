import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = props => {
  const {colors, updateColors} = props;
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: '',
    code: { hex: ''},
    id: Date.now()
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        // console.log(res);
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id), res.data
        ]);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res.data);
        updateColors([
          ...colors.filter(color => color.id !== res.data)
        ])
      })
      .catch(err => console.log(err))
  };

  const addColor = e => {
    console.log(newColor);
    e.preventDefault();
    axiosWithAuth()
      .post('/colors/', newColor)
      .then(res => {
        console.log(res.data);
        updateColors([
          ...colors, newColor
        ])
      })
      .catch(err => console.log(err))
  }

  console.log(newColor);

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
        <form onSubmit={addColor}>
          <label>
            color name:
            <input className="add-input" type="text" value={newColor.color} onChange={e => setNewColor({...newColor, color: e.target.value})} />
          </label>
          <label>
          hex code:
            <input className="add-input" type="text" value={newColor.code.hex} onChange={e => setNewColor({...newColor, code: { hex: e.target.value }})} />
          </label>
          <button type="submit">Add new color</button>
        </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
