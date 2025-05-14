 {/* <div className='col-span-6'>
                        <h1 className={`text-2xl font-bold text-gray-500 col-span-12`}>Antecedentes</h1> 
                        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 col-span-12" />
                    </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="peso"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.peso?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("peso")}
                  />
                  <label
                    htmlFor="peso"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.peso?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Peso
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.peso?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="talla"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.talla?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("talla")}
                  />
                  <label
                    htmlFor="talla"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.talla?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Talla
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.talla?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="imc"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.imc?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("imc")}
                  />
                  <label
                    htmlFor="imc"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.imc?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    imc
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.imc?.message}
                  </div>
                </div>

                <div className={`${ size.width <= 1200 ? "col-span-6" : "col-span-2"} `} >
                  <Checkbox
                    id="enfermedad"
                    label={
                      <div>
                        <Typography
                          color="blue-gray"
                          className="text-sm font-bold text-gray-500 text-center ml-6">
                          ¿Padece alguna enfermedad?
                        </Typography>
                      </div>
                    }
                    onClick={(e) => handleChange(e)}
                    {...register("enfermedad")}
                    className="h-4 w-4 rounded border border-colorTerciario bg-gray-100 focus:ring-2 focus:ring-colorTerciario dark:border-colorTerciario dark:bg-gray-100 dark:focus:ring-colorTerciario text-colorTerciario"
                    style={{ width: "24px", height: "24px", color: "#BC955B" }}
                  />
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="cual_enfermedad"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.cual_enfermedad?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("cual_enfermedad")}
                  />
                  <label
                    htmlFor="cual_enfermedad"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.cual_enfermedad?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Cual(Especifique)?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.cual_enfermedad?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="tratamiento"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.tratamiento?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("tratamiento")}
                  />
                  <label
                    htmlFor="tratamiento"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.tratamiento?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Tratamiento actual?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.tratamiento?.message}
                  </div>
                </div>

                <div className={`${ size.width <= 1200 ? "col-span-6" : "col-span-2"} `} >
                  <Checkbox
                    id="antecendente"
                    label={
                      <div>
                        <Typography
                          color="blue-gray"
                          className="text-sm font-bold text-gray-500 text-center ml-1">
                          ¿Antecendente de cancer de mama?
                        </Typography>
                      </div>
                    }
                    onClick={(e) => handleChange(e)}
                    {...register("antecendente")}
                    className="h-4 w-4 rounded border border-colorTerciario bg-gray-100 focus:ring-2 focus:ring-colorTerciario dark:border-colorTerciario dark:bg-gray-100 dark:focus:ring-colorTerciario text-colorTerciario"
                    style={{ width: "24px", height: "24px", color: "#BC955B" }}
                  />
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="edad_diagnostico"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.edad_diagnostico?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("edad_diagnostico")}
                  />
                  <label
                    htmlFor="edad_diagnostico"
                    className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.edad_diagnostico?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Edad en que se le diagnosticó?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.edad_diagnostico?.message}
                  </div>
                </div>

                <div className={`mb-6 w-full group ${size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <label
                    htmlFor="tratamiento_base"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${
                      !errors.tratamiento_base?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Tratamiento a base de
                  </label>
                  <Controller
                    name="tratamiento_base"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <CustomSelect
                        options={tratamientoBase}
                        isMulti={true}
                        // placeholder={
                        //   tipoBienCat != ""
                        //     ? tipoBienCat
                        //     : "Selecciona una opción"
                        // }
                        onChange={(e) => {
                          onChange(e.value);
                          newBien(e);
                        }}
                      />
                    )}
                  />
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.tratamiento_base?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-3"}`} >
                  <input
                    type="text"
                    id="tiempo_termino"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.tiempo_termino?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("tiempo_termino")}
                  />
                  <label
                    htmlFor="tiempo_termino"
                    className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.tiempo_termino?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Hace cuanto tiempo termino de c/u?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.tiempo_termino?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-3"}`} >
                  <input
                    type="text"
                    id="mastectomia"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.mastectomia?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("mastectomia")}
                  />
                  <label
                    htmlFor="mastectomia"
                    className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.mastectomia?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Año en que se realizó la mastectomia?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.mastectomia?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="complicacion"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.complicacion?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("complicacion")}
                  />
                  <label
                    htmlFor="complicacion"
                    className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.complicacion?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Presento alguna complicación?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.complicacion?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="mamaria_previa"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.mamaria_previa?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("mamaria_previa")}
                  />
                  <label
                    htmlFor="mamaria_previa"
                    className={`peer-focus:font-medium absolute text-xs duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.mamaria_previa?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Antecedente de implante de protésis mamaria previa?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.mamaria_previa?.message}
                  </div>
                </div>

                <div className={`relative z-0 mb-3 w-full group ${ size.width <= 1200 ? "col-span-6" : "col-span-2"}`} >
                  <input
                    type="text"
                    id="enfermedad_inmunologica"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.enfermedad_inmunologica?.message
                        ? "border-gray-500 focus:border-colorPrimario"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("enfermedad_inmunologica")}
                  />
                  <label
                    htmlFor="enfermedad_inmunologica"
                    className={`peer-focus:font-medium absolute text-xs duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.enfermedad_inmunologica?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    ¿Antecedente de enfermedad inmunologica?
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.enfermedad_inmunologica?.message}
                  </div>
                </div> */}