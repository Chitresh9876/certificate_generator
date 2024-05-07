export const template = (name, course, date, refID) => {
  console.log(name);
  return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
.input-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50%;
}

.image-container{
    height: 400px;
    width: 600px;
    position: relative;
}

.contain{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
}

.name{
    margin-top: 145px;
    color: rgb(255, 170, 0);
    text-align: center;
}

.course{
    margin-top: -15px;
    margin-left: 130px;
    width: 60%;
    text-align: center;
    font-weight: 800;
}

.refId{
    margin-top: 123px;
    margin-left: 82%;
    font-size: small;
}
.imag{
  height: 400px;
  width: 100%;
}
          </style>
       </head>
       <body>
         <div class="image-container">
        <img
          class="imag"
          src="https://iili.io/Jr1J4XS.png"
          alt="certificate image"
        />
        <div class="contain">
          <h1 class="name">${name}</h1>
          <p class="course">
            ${
              course &&
              `For successfully completing the Tutedude ${course} course on ${date}`
            }
          </p>
          <p class="refId">${refID}</p>
        </div>
      </div>
       </body>
    </html>
    `;
};
