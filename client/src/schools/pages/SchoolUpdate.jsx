import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import classes from "./SchoolUpdate.module.css";

const SchoolUpdate = () => {
  return (
    <section className={classes.containerFormRegister}>
      <h1>Modifier la fiche</h1>
      <form>
        <Input
          id="name"
          element="input"
          type="text"
          placeholder="Nom de l'école"
          name="name"
        />
        <Input
          id="address"
          element="input"
          type="text"
          placeholder="Adresse de l'école"
          name="address"
        />
        <Input
          id="country"
          element="input"
          type="text"
          placeholder="Pays"
          name="country"
        />
        <Input
          id="city"
          element="input"
          type="text"
          placeholder="Ville"
          name="city"
        />
        <Input
          id="description"
          element="textarea"
          rows="10"
          type="text"
          placeholder="description"
          name="description"
        />
        <Button big>Valider</Button>
      </form>
    </section>
  );
};

export default SchoolUpdate;
