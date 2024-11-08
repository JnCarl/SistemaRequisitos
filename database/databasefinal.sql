CREATE TABLE IF NOT EXISTS `reporte` (
	`repcod` TEXT NOT NULL,
	`repfec` REAL NOT NULL,
	`repprocod` TEXT NOT NULL,
	`repver` REAL NOT NULL,
	`repartcod` TEXT NOT NULL,
	`repautcod` TEXT NOT NULL,
FOREIGN KEY(`repprocod`) REFERENCES `proyecto`(`procod`),
FOREIGN KEY(`repartcod`) REFERENCES `artefacto`(`artcod`),
FOREIGN KEY(`repautcod`) REFERENCES `autor`(`autcod`)
);
CREATE TABLE IF NOT EXISTS `proyecto` (
	`procod` TEXT NOT NULL,
	`prover` REAL NOT NULL,
	`pronom` TEXT NOT NULL,
	`profeccre` REAL NOT NULL,
	`profecmod` REAL NOT NULL,
	`proestcod` TEXT NOT NULL,
	`procom` TEXT NOT NULL,
	`proorgcod` TEXT NOT NULL,
	`proartcod` TEXT NOT NULL,
FOREIGN KEY(`proestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`proorgcod`) REFERENCES `organizacion`(`orgcod`),
FOREIGN KEY(`proartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `organizacion` (
	`orgcod` TEXT NOT NULL,
	`orgver` REAL NOT NULL,
	`orgfeccrea` REAL NOT NULL,
	`orgfecmod` REAL NOT NULL,
	`orgnom` REAL NOT NULL,
	`orgdir` TEXT NOT NULL,
	`orgtel` INTEGER NOT NULL,
	`orgrepleg` TEXT NOT NULL,
	`orgtelrepleg` INTEGER NOT NULL,
	`orgruc` INTEGER NOT NULL,
	`orgcontact` TEXT NOT NULL,
	`orgtelcon` TEXT NOT NULL,
	`orgtiporgcod` TEXT NOT NULL,
	`orgautcod` TEXT NOT NULL,
	`orgest` TEXT NOT NULL,
	`orgcom` TEXT NOT NULL,
	`orgartcod` TEXT NOT NULL,
	`orgusuid` INTEGER NOT NULL,
FOREIGN KEY(`orgtiporgcod`) REFERENCES `tipo_organizacion`(`tiporgcod`),
FOREIGN KEY(`orgautcod`) REFERENCES `autor`(`autcod`),
FOREIGN KEY(`orgest`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`orgartcod`) REFERENCES `artefacto`(`artcod`),
FOREIGN KEY(`orgusuid`) REFERENCES `Usuario`(`UsuId`)
);
CREATE TABLE IF NOT EXISTS `tipo_organizacion` (
	`tiporgcod` TEXT NOT NULL,
	`tiporgnom` TEXT NOT NULL,
	`tiporgdes` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `modificacion_artefacto` (
	`modartcod` TEXT NOT NULL,
	`modartfecmod` REAL NOT NULL,
	`modartcom` REAL NOT NULL,
	`modartartcod` TEXT NOT NULL,
	`modartver` REAL NOT NULL,
	`modautcod` TEXT NOT NULL,
FOREIGN KEY(`modautcod`) REFERENCES `autor`(`autcod`)
);
CREATE TABLE IF NOT EXISTS `autor` (
	`autcod` TEXT NOT NULL,
	`autver` REAL NOT NULL,
	`autfecing` REAL NOT NULL,
	`autali` TEXT NOT NULL,
	`autorgcod` TEXT NOT NULL,
	`autestcod` TEXT NOT NULL,
	`autactcod` TEXT NOT NULL,
	`autcom` TEXT NOT NULL,
	`autapemat` TEXT NOT NULL,
	`autapepat` TEXT NOT NULL,
	`autnom` TEXT NOT NULL,
	`autcon` TEXT NOT NULL,
	`auttel` INTEGER NOT NULL,
	`autdni` INTEGER NOT NULL,
FOREIGN KEY(`autcod`) REFERENCES `metrica`(`metautcod`),
FOREIGN KEY(`autorgcod`) REFERENCES `organizacion`(`orgcod`),
FOREIGN KEY(`autestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`autactcod`) REFERENCES `actor`(`actcod`)
);
CREATE TABLE IF NOT EXISTS `autor_rol` (
	`autrolcod` TEXT NOT NULL,
	`autrolautcod` TEXT NOT NULL,
	`autrolrolcod` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `rol` (
	`rolcod` TEXT NOT NULL,
	`rolnom` TEXT NOT NULL,
	`rolfeccre` REAL NOT NULL,
	`rolcom` TEXT NOT NULL,
	`rolorgcod` TEXT NOT NULL,
FOREIGN KEY(`rolcod`) REFERENCES `autor_rol`(`autrolrolcod`),
FOREIGN KEY(`rolorgcod`) REFERENCES `organizacion`(`orgcod`)
);
CREATE TABLE IF NOT EXISTS `estado` (
	`estcod` TEXT NOT NULL,
	`estnom` TEXT NOT NULL,
	`estdescrip` TEXT NOT NULL,
FOREIGN KEY(`estcod`) REFERENCES `educcion`(`eduestcod`)
);
CREATE TABLE IF NOT EXISTS `educcion` (
	`educod` TEXT NOT NULL,
	`eduver` TEXT NOT NULL,
	`edufeccre` REAL NOT NULL,
	`edufecmod` REAL NOT NULL,
	`eduestcod` TEXT NOT NULL,
	`edunivpricod` TEXT NOT NULL,
	`eduilacod` TEXT NOT NULL,
	`educom` TEXT NOT NULL,
	`eduprocod` TEXT NOT NULL UNIQUE,
	`eduautcod` TEXT NOT NULL,
	`edufuecod` TEXT NOT NULL,
	`eduexpcod` TEXT NOT NULL,
	`eduactcod` TEXT NOT NULL,
	`eduartcod` TEXT NOT NULL,
FOREIGN KEY(`eduprocod`) REFERENCES `proyecto`(`procod`)
);
CREATE TABLE IF NOT EXISTS `nivel_prioridad` (
	`nivpricod` TEXT NOT NULL,
	`nivpripri` TEXT NOT NULL,
FOREIGN KEY(`nivpricod`) REFERENCES `educcion`(`edunivpricod`)
);
CREATE TABLE IF NOT EXISTS `actor` (
	`actcod` TEXT NOT NULL,
	`actver` REAL NOT NULL,
	`actfeccrea` REAL NOT NULL,
	`actfecmod` REAL NOT NULL,
	`actautplacod` TEXT NOT NULL,
	`actestcod` TEXT NOT NULL,
	`actcom` TEXT NOT NULL,
	`actprocod` TEXT NOT NULL UNIQUE,
	`acttipactcod` TEXT NOT NULL,
	`actartcod` TEXT NOT NULL,
	`artrolacr` TEXT NOT NULL,
FOREIGN KEY(`actcod`) REFERENCES `especificacion`(`espactcod`),
FOREIGN KEY(`actautplacod`) REFERENCES `autor`(`autcod`),
FOREIGN KEY(`actestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`actprocod`) REFERENCES `proyecto`(`procod`),
FOREIGN KEY(`acttipactcod`) REFERENCES `tipo_actor`(`tipactcod`),
FOREIGN KEY(`actartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `rol_actor` (
	`rolactcod` TEXT NOT NULL,
	`rolactnom` TEXT NOT NULL,
FOREIGN KEY(`rolactcod`) REFERENCES `actor`(`artrolacr`)
);
CREATE TABLE IF NOT EXISTS `experto` (
	`expcod` TEXT NOT NULL,
	`expver` REAL NOT NULL,
	`expfeccre` REAL NOT NULL,
	`expfecmod` REAL NOT NULL,
	`expapepat` TEXT NOT NULL,
	`expapemat` TEXT NOT NULL,
	`expnom` TEXT NOT NULL,
	`expexp` TEXT NOT NULL,
	`expprocod` TEXT NOT NULL,
	`expautplacod` TEXT NOT NULL,
	`expcom` TEXT NOT NULL,
	`expartcod` TEXT NOT NULL,
	`expestcod` TEXT NOT NULL,
FOREIGN KEY(`expcod`) REFERENCES `requisito_no_funcional`(`reqnofunexpcod`),
FOREIGN KEY(`expprocod`) REFERENCES `proyecto`(`procod`),
FOREIGN KEY(`expautplacod`) REFERENCES `autor`(`autcod`),
FOREIGN KEY(`expartcod`) REFERENCES `artefacto`(`artcod`),
FOREIGN KEY(`expestcod`) REFERENCES `estado`(`estcod`)
);
CREATE TABLE IF NOT EXISTS `fuente` (
	`fuecod` TEXT NOT NULL,
	`fuever` REAL NOT NULL,
	`fuefeccre` REAL NOT NULL,
	`fuefecmod` REAL NOT NULL,
	`fueautplancod` TEXT NOT NULL,
	`fueestcod` TEXT NOT NULL,
	`fuecom` TEXT NOT NULL,
	`fueprocod` TEXT NOT NULL,
FOREIGN KEY(`fuecod`) REFERENCES `requisito_no_funcional`(`reqnofunfuecod`),
FOREIGN KEY(`fueestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`fueprocod`) REFERENCES `proyecto`(`procod`)
);
CREATE TABLE IF NOT EXISTS `ilacion` (
	`ilacod` TEXT NOT NULL,
	`ilaver` INTEGER NOT NULL,
	`ilafeccre` REAL NOT NULL,
	`ilafecmod` REAL NOT NULL,
	`ilaestcod` TEXT NOT NULL,
	`ilanivpricod` TEXT NOT NULL,
	`ilaespcod` TEXT NOT NULL,
	`ilacom` TEXT NOT NULL,
	`ilaprocod` TEXT NOT NULL,
	`ilaautplancod` TEXT NOT NULL,
	`ilafuecod` TEXT NOT NULL,
	`ilaexpcod` TEXT NOT NULL,
	`ilaactcod` TEXT NOT NULL,
	`ilaartcod` TEXT NOT NULL,
FOREIGN KEY(`ilacod`) REFERENCES `educcion`(`eduilacod`),
FOREIGN KEY(`ilaestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`ilanivpricod`) REFERENCES `nivel_prioridad`(`nivpricod`),
FOREIGN KEY(`ilaprocod`) REFERENCES `proyecto`(`procod`),
FOREIGN KEY(`ilaartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `especificacion` (
	`espcod` TEXT NOT NULL,
	`espver` REAL NOT NULL,
	`espfeccre` REAL NOT NULL,
	`espfecmod` REAL NOT NULL,
	`espestcod` TEXT NOT NULL,
	`espnivpricod` TEXT NOT NULL,
	`espcom` TEXT NOT NULL,
	`espprocod` TEXT NOT NULL,
	`espautplancod` TEXT NOT NULL,
	`espfuecod` TEXT NOT NULL,
	`espexpcod` TEXT NOT NULL,
	`espactcod` TEXT NOT NULL,
	`espartcod` TEXT NOT NULL,
FOREIGN KEY(`espcod`) REFERENCES `ilacion`(`ilaespcod`),
FOREIGN KEY(`espestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`espnivpricod`) REFERENCES `nivel_prioridad`(`nivpricod`),
FOREIGN KEY(`espprocod`) REFERENCES `proyecto`(`procod`)
);
CREATE TABLE IF NOT EXISTS `tipo_actor` (
	`tipactcod` TEXT NOT NULL,
	`tipactnomact` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `tipo_metrica` (
	`tipmetcod` TEXT NOT NULL,
	`tipmetnom` TEXT NOT NULL,
FOREIGN KEY(`tipmetcod`) REFERENCES `metrica`(`mettipmetcod`)
);
CREATE TABLE IF NOT EXISTS `requisito_no_funcional` (
	`reqnofuncod` TEXT NOT NULL,
	`reqnofunver` REAL NOT NULL,
	`reqnofunfeccre` REAL NOT NULL,
	`reqnofunfecmod` REAL NOT NULL,
	`reqnofunnom` TEXT NOT NULL,
	`reqnofunatrcalcod` TEXT NOT NULL,
	`reqnofundes` TEXT NOT NULL,
	`reqnofunautcod` TEXT NOT NULL,
	`reqnofunfuecod` TEXT NOT NULL,
	`reqnofunexpcod` TEXT NOT NULL,
	`reqnofunestcod` TEXT NOT NULL,
	`reqnofunnivpricod` TEXT NOT NULL,
	`reqnofuncom` TEXT NOT NULL,
	`reqnofunprocod` TEXT NOT NULL,
FOREIGN KEY(`reqnofunatrcalcod`) REFERENCES `atributo_calidad`(`atrcalcod`),
FOREIGN KEY(`reqnofunestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`reqnofunnivpricod`) REFERENCES `nivel_prioridad`(`nivpricod`),
FOREIGN KEY(`reqnofunprocod`) REFERENCES `proyecto`(`procod`)
);
CREATE TABLE IF NOT EXISTS `interfaz` (
	`intcod` TEXT NOT NULL,
	`intnom` TEXT NOT NULL,
	`intfeccre` REAL NOT NULL,
	`intfecmod` REAL NOT NULL,
	`intestcod` TEXT NOT NULL,
	`intartcod` TEXT NOT NULL,
FOREIGN KEY(`intestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`intartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `riesgo_educcion` (
	`rieeducod` TEXT NOT NULL,
	`rieeduver` REAL NOT NULL,
	`rieedures` TEXT NOT NULL,
	`rieedurieid` TEXT NOT NULL,
	`rieeduprobcual` TEXT NOT NULL,
	`rieeduprob` REAL NOT NULL,
	`rieeduimp` TEXT NOT NULL,
	`rieeduindpi` INTEGER NOT NULL,
	`rieeducoserr` REAL NOT NULL,
	`rieeduexprie` REAL NOT NULL,
	`rieeduest` TEXT NOT NULL,
	`rieeduplamit` TEXT NOT NULL,
	`rieedueducod` TEXT NOT NULL,
FOREIGN KEY(`rieedueducod`) REFERENCES `educcion`(`educod`)
);
CREATE TABLE IF NOT EXISTS `riesgo_ilacion` (
	`rieilacod` TEXT NOT NULL,
	`rieilaver` REAL NOT NULL,
	`rieilares` TEXT NOT NULL,
	`rieilarieide` TEXT NOT NULL,
	`rieilaprocua` TEXT NOT NULL,
	`rieilapro` REAL NOT NULL,
	`rieilaimp` TEXT NOT NULL,
	`rieilaindp` INTEGER NOT NULL,
	`rieilacoserr` REAL NOT NULL,
	`rieilaexprie` REAL NOT NULL,
	`rieilaest` TEXT NOT NULL,
	`rieilaplamit` TEXT NOT NULL,
	`rieilailacod` TEXT NOT NULL,
FOREIGN KEY(`rieilailacod`) REFERENCES `ilacion`(`ilacod`)
);
CREATE TABLE IF NOT EXISTS `entrevista` (
	`entcod` TEXT NOT NULL,
	`entver` REAL NOT NULL,
	`entfec` REAL NOT NULL,
	`entautcod` TEXT NOT NULL,
	`entnoment` TEXT NOT NULL,
	`entcarent` TEXT NOT NULL,
	`enthorini` INTEGER NOT NULL,
	`enthorfin` INTEGER NOT NULL,
	`entdur` INTEGER NOT NULL,
	`entobstie` TEXT NOT NULL,
	`entagecod` TEXT NOT NULL,
	`entconcod` TEXT NOT NULL,
	`entobs` TEXT NOT NULL,
	`entprocod` TEXT NOT NULL,
	`entartcod` TEXT NOT NULL,
FOREIGN KEY(`entautcod`) REFERENCES `autor`(`autcod`),
FOREIGN KEY(`entprocod`) REFERENCES `proyecto`(`procod`),
FOREIGN KEY(`entartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `acta_aceptacion` (
	`actacecod` TEXT NOT NULL,
	`actaceprocod` TEXT NOT NULL UNIQUE,
FOREIGN KEY(`actaceprocod`) REFERENCES `proyecto`(`procod`)
);
CREATE TABLE IF NOT EXISTS `evidencia` (
	`evicod` TEXT NOT NULL,
	`evinom` TEXT NOT NULL,
	`evientcod` TEXT NOT NULL,
	`evifec` REAL NOT NULL,
	`evicatevicod` TEXT NOT NULL,
	`eviartcod` TEXT NOT NULL,
FOREIGN KEY(`evientcod`) REFERENCES `entrevista`(`entcod`),
FOREIGN KEY(`evicatevicod`) REFERENCES `categoria_evidencia`(`catevicod`),
FOREIGN KEY(`eviartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `metrica` (
	`metcod` TEXT NOT NULL,
	`mettipmetcod` TEXT NOT NULL,
	`metautcod` TEXT NOT NULL,
	`methorini` INTEGER NOT NULL,
	`methorfin` INTEGER NOT NULL,
	`metdiftim` INTEGER NOT NULL,
	`metcanhor` INTEGER NOT NULL,
	`metcanmin` INTEGER NOT NULL,
	`mettolmin` INTEGER NOT NULL,
	`metfeccre` REAL NOT NULL,
	`metfecmod` REAL NOT NULL,
	`metcorcod` TEXT NOT NULL,
	`metplacod` TEXT NOT NULL,
	`metartcod` TEXT NOT NULL,
FOREIGN KEY(`metcorcod`) REFERENCES `correccion`(`corcod`),
FOREIGN KEY(`metartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `agenda` (
	`agecod` TEXT NOT NULL,
	`ageentcod` TEXT NOT NULL,
	`agetex` TEXT NOT NULL,
FOREIGN KEY(`agecod`) REFERENCES `entrevista`(`entagecod`)
);
CREATE TABLE IF NOT EXISTS `artefacto` (
	`artcod` TEXT NOT NULL,
	`artnom` TEXT NOT NULL,
	`artnem` TEXT NOT NULL,
FOREIGN KEY(`artcod`) REFERENCES `especificacion`(`espartcod`)
);
CREATE TABLE IF NOT EXISTS `atributo_calidad` (
	`atrcalcod` TEXT NOT NULL,
	`atrcalnom` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `categoria_evidencia` (
	`catevicod` TEXT NOT NULL,
	`catevinom` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `conclusion` (
	`concod` TEXT NOT NULL,
	`conentcod` TEXT NOT NULL,
	`contex` TEXT NOT NULL,
FOREIGN KEY(`concod`) REFERENCES `entrevista`(`entconcod`)
);
CREATE TABLE IF NOT EXISTS `correccion` (
	`corcod` TEXT NOT NULL,
	`cornom` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `operacion_artefacto` (
	`opeartcod` TEXT NOT NULL,
	`opeartnom` TEXT NOT NULL,
	`opeartartcod` TEXT NOT NULL,
FOREIGN KEY(`opeartartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `caso_prueba` (
	`casprucod` TEXT NOT NULL,
	`casprudatent` TEXT NOT NULL,
	`caspruresesp` TEXT NOT NULL,
	`caspruestpru` TEXT NOT NULL,
	`caspruobs` TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS `prueba_software` (
	`prusofcod` TEXT NOT NULL,
	`prusofver` REAL NOT NULL,
	`prusoffeccre` REAL NOT NULL,
	`prusoffecmod` REAL NOT NULL,
	`prusofnom` TEXT NOT NULL,
	`prusofdes` TEXT NOT NULL,
	`prusofobj` TEXT NOT NULL,
	`prusofautcod` TEXT NOT NULL,
	`prusofcaspruecod` TEXT NOT NULL,
	`prusofprocod` TEXT NOT NULL,
	`prusofestcod` TEXT NOT NULL,
	`prusofartcod` TEXT NOT NULL,
FOREIGN KEY(`prusofautcod`) REFERENCES `autor`(`autcod`),
FOREIGN KEY(`prusofcaspruecod`) REFERENCES `caso_prueba`(`casprucod`),
FOREIGN KEY(`prusofprocod`) REFERENCES `proyecto`(`procod`),
FOREIGN KEY(`prusofestcod`) REFERENCES `estado`(`estcod`),
FOREIGN KEY(`prusofartcod`) REFERENCES `artefacto`(`artcod`)
);
CREATE TABLE IF NOT EXISTS `riesgo_especificacion` (
	`rieespcod` TEXT NOT NULL,
	`rieespver` REAL NOT NULL,
	`rieespres` TEXT NOT NULL,
	`rieesprieide` TEXT NOT NULL,
	`rieespprocua` TEXT NOT NULL,
	`rieesppro` REAL NOT NULL,
	`rieespimp` TEXT NOT NULL,
	`rieespindp` INTEGER NOT NULL,
	`rieespcoserr` REAL NOT NULL,
	`rieespexprie` REAL NOT NULL,
	`rieespest` TEXT NOT NULL,
	`rieespplamit` TEXT NOT NULL,
	`rieespespcod` TEXT NOT NULL,
FOREIGN KEY(`rieespespcod`) REFERENCES `especificacion`(`espcod`)
);
CREATE TABLE IF NOT EXISTS `riesgo_requerimiento_no_funcional` (
	`riereqnofuncod` TEXT NOT NULL,
	`riereqnofunver` REAL NOT NULL,
	`riereqnofunres` TEXT NOT NULL,
	`riereqnofunrieid` TEXT NOT NULL,
	`riereqnofunprobcual` TEXT NOT NULL,
	`riereqnofunprob` REAL NOT NULL,
	`riereqnofunimp` TEXT NOT NULL,
	`riereqnofunindpi` INTEGER NOT NULL,
	`riereqnofuncoserr` REAL NOT NULL,
	`riereqnofunexprie` REAL NOT NULL,
	`riereqnofunestcod` TEXT NOT NULL,
	`riereqnofunartcod` TEXT NOT NULL,
	`riereqnofunplamit` TEXT NOT NULL,
	`riereqnofunreqnofuncod` TEXT NOT NULL,
FOREIGN KEY(`riereqnofunreqnofuncod`) REFERENCES `requisito_no_funcional`(`reqnofuncod`)
);
CREATE TABLE IF NOT EXISTS `permiso_autor` (
	`perautcod` TEXT NOT NULL,
	`perautopecod` INTEGER NOT NULL,
	`perautautcod` TEXT NOT NULL,
FOREIGN KEY(`perautopecod`) REFERENCES `operacion_artefacto`(`opeartcod`),
FOREIGN KEY(`perautautcod`) REFERENCES `autor`(`autcod`)
);
CREATE TABLE IF NOT EXISTS `Usuario` (
	`UsuId` integer primary key NOT NULL UNIQUE,
	`UsuNom` TEXT NOT NULL,
	`UsuApePat` TEXT NOT NULL,
	`UsuApeMat` TEXT NOT NULL,
	`UsuCorEle` TEXT NOT NULL,
	`UsuNomUsu` TEXT NOT NULL,
	`UsuCon` TEXT NOT NULL
);