export type Session = {
  id: string;
  week: number;
  primary: string;
  primaryFocus: string;
  linked: string;
  linkedFocus: string;
  because: string;
  evening: string;
  eveningFocus: string;
  drill: string;
  later?: string;
  covers?: string[];
};

type Raw = [
  primary: string,
  primaryFocus: string,
  linked: string,
  linkedFocus: string,
  because: string,
  evening: string,
  eveningFocus: string,
  drill: string,
  later?: string,
  covers?: string,
];

const raw: Raw[] = [
  ["phy11-units", "SI units, significant figures, dimensions. One page. Stop when the page is full.", "phy11-units", "Twenty MCQs on units and errors. Twenty minutes. Skip anything under 70 percent sure.", "Every numerical in physics, chemistry, and the CET uses this page. It has to be first.", "cet-pos", "Parts of speech. Mark ten sentences. CET English and your essays both start here.", "Fifteen dimension questions. Score is right minus 0.24 times wrong.", "Mole concept tomorrow uses the same habit: unit on every line."],
  ["chem11-basic", "Mole, molar mass, percentage composition, stoichiometry. Ten numericals, units written out.", "chem11-basic", "The same mole sums as MCQs. If you cannot do it without a calculator, you cannot do it in the hall.", "Stoichiometry is the grammar of every chemistry chapter after this.", "pe11-1", "Changing trends and careers. Aims of PE, Khelo India, Fit India. Two pages, not an essay.", "Twelve mole numericals, mixed."],
  ["math11-sets", "Sets, intervals, Venn diagrams, complement laws. Prove the complement properties once, slowly.", "math11-sets", "CET set questions, including ‘which is not true’. Draw the Venn before you touch the options.", "Relations, functions, and probability all sit on this.", "cet-analogy", "Twenty-five analogies. Name the relation in four words before you look at choices.", "Fifteen set MCQs."],
  ["math11-rel", "Domain, co-domain, range. Graphs: constant, identity, modulus, signum, exponential, log, greatest integer.", "math11-rel", "For each graph, write the domain in one line. That is the exam version.", "Class 12 will ask reflexive, symmetric, transitive. That waits until this feels boring.", "cet-syn", "Forty synonym and antonym pairs. Say each one out loud once.", "Ten domain-and-range questions."],
  ["chem11-atom", "Bohr, then quantum numbers and the rules for filling orbitals. One orbital sketch that you could redraw from memory.", "chem11-atom", "CET configurations and quantum numbers. Fifteen, timed.", "Periodicity needs this. Physics ‘Atoms’ in Class 12 comes back here on purpose, much later.", "cet-misc", "Inventors, firsts, city nicknames. Twenty facts, written. Then close the tab.", "Fifteen atomic-structure MCQs.", "Class 12 Bohr model will feel like a reunion, not a new subject."],
  ["math11-trig", "Radians, the addition formulas, double and triple angles, graphs of sin, cos and tan.", "math11-trig", "Fifteen identities, timed, formula sheet closed.", "Oscillations, waves, projectiles, and inverse trig all wait on this. Learn it once.", "cet-simplify", "Simplification, fractions, HCF, LCM. Twenty short ones. Speed without mess.", "Fifteen trigonometry MCQs."],

  ["math11-lim", "Limit as a picture, then the derivative as slope and as rate. Product rule and quotient rule on polynomials and trig.", "math11-lim", "Differentiate ten standard functions. Then one rate-of-change sentence in words, no symbols.", "Tomorrow’s motion graphs are derivatives. People who do motion first spend a month confused.", "cet-tense", "Fifteen tense transformations, written, not recognised.", "Ten derivative MCQs."],
  ["phy11-line", "x–t and v–t graphs, the three equations, average against instantaneous. Say which slope is acceleration.", "math11-lim", "Point at a v–t graph and mark slope as a, area as displacement. Yesterday’s derivative, today’s picture.", "Uses limits. Unlocks plane motion, work-energy, and every CET kinematics set.", "pe11-2", "Olympic values, ancient to modern, India at the Games. One page.", "Fifteen kinematics MCQs, graphs included.", "Class 12 magnetic force will split vectors the same way."],
  ["phy11-plane", "Vector components, projectile motion, uniform circular motion. Resolve one projectile both ways on paper.", "phy11-plane", "Time of flight, range, maximum height. Formula sheet closed after the first two.", "Needs trig components and straight-line motion. These vectors are the ones Class 12 maths will formalise.", "cet-series", "Number series and odd-one-out, twenty. Write the rule before you pick.", "Twelve projectile MCQs."],
  ["chem11-period", "s, p, d, f blocks and the trends: radius, ionisation, electronegativity. Learn the exceptions, not just the arrows.", "chem11-period", "If two options both say ‘increases’, you missed the exception. Fifteen questions.", "Directly after atomic structure. The d-block in Class 12 is this chapter’s sequel.", "cet-geo", "Indian coastline, ports, straits, islands. Write a tiny map in words.", "Twelve periodic-trend MCQs."],
  ["chem11-bond", "VSEPR shapes, hybridisation, molecular orbital bond order for O2 and N2, hydrogen bonding. One shape, one diagram.", "chem11-bond", "Shape from VSEPR, bond order from orbitals. Fifteen.", "Needs the atom chapter. Coordination compounds are unreadable without hybridisation.", "cet-phrasal", "Twenty phrasal verbs, each in a sentence a person would actually say.", "Fifteen bonding MCQs."],
  ["math11-lines", "Slope, point-slope, intercept form, distance from a point to a line. Five labelled graphs.", "math11-ineq", "Inequalities in one variable, on a number line. Two-variable graphs only if the first set feels easy.", "Slope is last week’s motion graph, said in algebra. Inequalities are the gate to linear programming.", "pe11-5", "Five components of physical fitness. One diagram. Wellness in a paragraph, not a chapter dump.", "Ten line questions and five inequalities."],

  ["phy11-laws", "Newton’s laws, impulse, friction, circular motion on a level road and a banked road. Free-body diagram first, always.", "phy11-laws", "CET friction and banking. No number until the forces are drawn.", "After kinematics. Tomorrow, work-energy tells the same stories with a different tool.", "cet-idiom", "Twenty idioms. Use five in sentences.", "Fifteen laws-of-motion MCQs."],
  ["phy11-work", "Work-energy theorem, potential, spring, one-dimension collisions, motion in a vertical circle.", "phy11-work", "If you reach for a formula first, stop and name the energy. Twelve questions.", "Needs the laws. Rotation borrows torque and energy from here.", "cet-coding", "Coding-decoding, twenty. Letter shifts and number codes. Note the rule, then a faster second set.", "Twelve work-energy MCQs."],
  ["chem11-org", "IUPAC names, isomerism, inductive and resonance effects, intermediates. Name fifteen compounds without looking.", "chem11-org", "Which effect wins, and what the product is. Fifteen.", "This is the gate. Haloalkanes through biomolecules assume it.", "cet-voice", "Active and passive, fifteen transformations. Class 12 elective grammar is the same muscle.", "Fifteen organic-basics MCQs."],
  ["chem11-hydro", "Alkanes, alkenes, alkynes, benzene: the preparations and the reactions CET actually asks. A one-page reaction map.", "chem11-hydro", "Reaction to product, fifteen, timed. Map closed.", "After basic principles. Class 12 organic starts at haloalkanes only once this map exists.", "pe11-3", "Two asanas you will do in today’s sport block. Steps, one benefit, one contraindication.", "Fifteen hydrocarbon MCQs."],
  ["math11-complex", "Why √−1 shows up, algebra of complex numbers, the Argand plane. Three quadratics that fail in the reals.", "math11-complex", "Modulus and argument. Twelve MCQs.", "A short chapter, placed before the heavier counting. Read one induction proof today and leave it — it is formative.", "cet-polity", "Dates, sources of the Constitution, fundamental rights, who appoints whom. Fifteen facts, written.", "Twelve complex-number MCQs."],
  ["math11-pc", "Counting principle, n!, permutations, combinations. Ten word problems. Say whether order matters before each one.", "math11-pc", "If order matters, it is P. Say that sentence, then answer. Fifteen.", "Both probability chapters are this, with a story on top.", "cet-arith", "Ratio, percentage, profit and loss. Fifteen. The unit is part of the answer.", "Twelve counting MCQs."],

  ["phy11-rot", "Centre of mass, torque, angular momentum, moment of inertia of the simple shapes. Use the standard results.", "phy11-rot", "What is conserved, and which way the torque points. Twelve.", "Needs laws and work-energy. Do not skip rolling without slipping.", "cet-mean", "Fifteen short lines. Meaning from context, not from a word list.", "Twelve rotation MCQs."],
  ["phy11-grav", "Kepler, Newton’s law, g with height and depth, escape speed, satellite energy.", "phy11-grav", "One line of formula, one line of substitution, the unit. Ten numericals.", "Uses circular motion. CET orbit questions are this page.", "eng11-peacock", "The Peacock. Read twice. Four lines on the image, not a summary of the plot — there isn’t one.", "Ten gravitation numericals."],
  ["chem11-thermo", "System, ΔU, ΔH, Hess’s law, entropy, Gibbs energy. The sign convention written at the top of the page.", "chem11-thermo", "Enthalpy sums and ‘is it spontaneous’. Twelve.", "Physics thermodynamics is tomorrow, in the same words. Learn one language, not two.", "pe11-7", "Heart, lungs, muscle. A labelled sketch. You need the body before the Class 12 injury chapter.", "Twelve thermochemistry MCQs."],
  ["phy11-thermo", "Zeroth, first, and second laws. Isothermal and adiabatic. What Q, W, and U do in each.", "chem11-thermo", "Same process, two notebooks. Write one isothermal change in both physics and chemistry notation.", "Yesterday was the chemistry of this. Today is the physics. Do not restart from zero.", "eng11-sonnet", "Sonnet 116. Paraphrase it in six plain lines, then one line on what ‘alteration’ is doing.", "Ten thermodynamics MCQs."],
  ["chem11-eq", "Kc, Kp, Le Chatelier, ionic equilibrium, buffers, solubility. Q against K, in that order.", "chem11-eq", "Predict the shift before you calculate. Fifteen.", "Gibbs energy from last week is why K has the value it has. Electrochemistry needs both.", "cet-ranking", "Ranking, time sequence, tallest-youngest. Twenty.", "Fifteen equilibrium MCQs."],
  ["math11-bin", "Statement, proof idea, Pascal’s triangle, a few expansions. General term if it comes easily — it is formative.", "math11-bin", "Find the term, or the middle term. Twelve.", "Counting from permutations is the engine. Series is the next stop, not today.", "cet-misc", "Battles, dates, personalities. Twenty facts. Bankim, Gandhi, the nicknames. Then stop.", "Twelve binomial MCQs."],

  ["phy11-solids", "Stress, strain, Hooke, Young’s modulus. One numerical with units that match.", "phy11-solids", "Elasticity MCQs. Eight is enough if they are fully worked.", "Force from Newton’s laws, now inside a material.", "pe11-8", "Levers, centre of gravity, equilibrium. Kinesiology is rotation and torque said for sport.", "Ten elasticity questions."],
  ["phy11-fluids", "Pressure, Pascal, viscosity, Stokes, Bernoulli, surface tension, capillary rise. One application each.", "phy11-fluids", "Bernoulli and terminal velocity. Ten.", "After solids. Pressure is force on area, which you already have.", "cet-geo", "Rivers, dams, canals. Where they are, which states. One page.", "Ten fluids MCQs."],
  ["phy11-thermal", "Expansion, calorimetry, latent heat, conduction. Anomalous expansion of water in one clean paragraph.", "phy11-thermal", "Calorimetry numericals. The trick is the sign of heat lost.", "Uses the heat language from thermodynamics.", "eng11-lament", "The Lament. Who is Iona talking to, and why does that matter. Half a page.", "Ten heat MCQs."],
  ["phy11-kinetic", "Assumptions, pressure from molecules, rms speed, degrees of freedom, mean free path.", "chem11-gas", "Ideal gas law and where it fails. Qualitative. This is the formative chapter, read beside today’s physics.", "Kinetic theory is the microscopic version of the gas laws. They are one idea.", "pe11-6", "Test, measurement, evaluation. What a test is for. BMI and a fitness test, sketched.", "Ten kinetic-theory MCQs."],
  ["math11-seq", "AP and GP, sum of n terms, infinite GP, arithmetic and geometric means.", "math11-seq", "CET series. Twelve. Identify AP or GP before you touch the formula.", "A short, sharp chapter. It also feeds a few aptitude patterns.", "cet-commercial", "Simple and compound interest, work and time, speed. Fifteen.", "Twelve sequence questions."],
  ["chem11-redox", "Oxidation number rules until they are boring. Then balance one equation in acid and one in base.", "chem11-redox", "Oxidation numbers under time. Fifteen.", "Electrochemistry in Class 12 is this chapter with a cell drawn around it. Not before.", "eng11-mustache", "A Pair of Mustachios. What is the story actually mocking. Ten lines.", "Fifteen redox MCQs."],

  ["phy11-osc", "SHM, spring and pendulum, energy in an oscillator, damped and forced only at the idea level.", "phy11-osc", "Time period questions. Check dimensions of your answer.", "Needs trig and the derivative. Waves tomorrow are SHM that travels.", "cet-puzzle", "Direction sense and a few blood relations. Twenty.", "Twelve SHM MCQs."],
  ["phy11-waves", "Speed, reflection, standing waves, beats, Doppler. One diagram of a standing wave with nodes marked.", "phy11-waves", "Doppler and beats. Ten.", "After oscillations. Electromagnetic waves and wave optics both come back to this page.", "eng11-coming", "Coming. What arrives, besides the weather. Four lines of appreciation.", "Ten wave MCQs."],
  ["math11-conic", "Parabola, ellipse, hyperbola: standard equation and the one property you will be asked. Circle included.", "math11-conic", "Identify the curve from the equation. Twelve.", "Area under curves in Class 12 uses these equations. Memorise them before integrals exist.", "cet-misc", "Dance forms and research institutes. Fifteen. Write, don’t highlight.", "Twelve conic MCQs."],
  ["math11-3d", "Octants, distance between two points, section formula if you have time.", "math11-3d", "Distance in 3D. Ten. Draw the box.", "Class 12 lines in space are this, plus a direction. The direction waits for vectors.", "cet-mensuration", "Area, perimeter, volume, one simple trig height. Fifteen.", "Ten 3D-distance questions."],
  ["math11-stat", "Mean deviation, variance, standard deviation. Ungrouped first, then one grouped example.", "math11-stat", "CET statistics is short. Eight questions, fully shown.", "Dispersion before probability’s harder stories. You already know a mean.", "eng11-horse", "The Rocking-horse Winner. What does the boy think luck is. Half a page.", "Eight statistics questions."],
  ["math11-prob", "Events, ‘not’, ‘and’, ‘or’, mutually exclusive, the axiomatic idea. No Bayes yet.", "math11-prob", "One card problem, one coin, one dice. Then five MCQs.", "Needs permutations. Bayes in Class 12 is this plus a condition.", "pe11-9", "Motivation, personality, aggression in sport. One example from a game you watch.", "Twelve probability MCQs."],

  ["phy12-charges", "Coulomb, superposition, field lines, dipole, Gauss’s law for the three standard shapes.", "phy11-plane", "Redo vector addition for ten minutes, then the new chapter. The tool is old. The charges are new.", "Plane motion gave you vectors. Gauss is those vectors on a closed surface.", "eng11-tongue", "Mother Tongue. Whose language is the poem in, really. A short note.", "Fifteen electrostatics MCQs. Skip the ones that are only algebra.", "Current electricity is the next room, not a different house."],
  ["phy12-potential", "Potential of a point charge and a dipole, equipotential surfaces, capacitors in series and parallel, energy stored.", "phy12-charges", "Five Gauss questions you got wrong or guessed, redone cleanly, before any new capacitor.", "Potential is the field, integrated. Capacitors need the field first.", "eng11-garrideb", "The Three Garridebs. How Doyle lets you suspect. Character note, not a plot dump.", "Twelve capacitor MCQs."],
  ["phy12-current", "Drift, Ohm, resistivity, cells, Kirchhoff, Wheatstone. One circuit drawn and solved in full.", "phy12-potential", "Series and parallel still mean what they meant for capacitors. Say the difference in two lines.", "After potential. Magnetism needs a current to exist in this course.", "cet-commercial", "Time, speed, distance, and one work problem. Fifteen. Keep it light tonight.", "Twelve current-electricity MCQs."],
  ["chem12-sol", "Concentration terms, Raoult, ideal and non-ideal, the four colligative properties. One numerical each.", "chem11-basic", "Ten minutes of mole fraction, because every colligative formula is a mole in disguise.", "The mole concept is weeks old and still the engine. Van’t Hoff factor comes after you can say why.", "pe11-10", "Training principles and doping. Classes, examples, why it fails the sport. One page.", "Ten solutions numericals."],
  ["chem12-electro", "Cell notation, Nernst, conductance, electrolysis, batteries, corrosion. One Nernst numerical written fully.", "chem11-redox", "Re-balance one redox equation. Then build the cell. The new idea is the voltage, not the oxidation number.", "Needs redox, equilibrium, and the idea of a potential from physics. All three are already done.", "pe12-7", "Injuries: soft tissue, bone, first response. Builds on the anatomy sketch from the thermo week.", "Ten electrochemistry MCQs."],
  ["chem12-kin", "Rate laws, order, half-life, Arrhenius. One graph of ln k against 1/T, even a rough one.", "chem11-eq", "Write the difference between rate and equilibrium constant in two sentences. People mix them up for years.", "Equilibrium told you where a reaction sits. Kinetics tells you how fast it gets there.", "cet-puzzle", "A direction set and a seating set. Twenty minutes, then stop.", "Twelve kinetics MCQs."],

  ["phy12-moving", "Biot–Savart for a loop, Ampere for a long wire, force on a charge and on a wire, torque on a loop, galvanometer.", "phy12-current", "Kirchhoff is not today’s topic. If the circuit from last week is shaky, fix one circuit, then the magnetic force.", "Needs current and the vector split from Class 11. The moving charge is a projectile with a sideways push.", "eng11-watch", "My Watch. How Twain makes a machine funny. Tone, in five lines.", "Twelve magnetism-of-currents MCQs."],
  ["phy12-mag", "Bar magnet, field lines, para, dia, ferro, and what temperature does to them.", "phy12-moving", "The loop-as-dipole idea, restated in two lines, then the materials.", "After moving charges. The magnet is a stack of those loops, said qualitatively.", "cet-misc", "Ministers, first president, first prime minister, a few battles. Fifteen written facts.", "Ten magnetism-and-matter MCQs."],
  ["phy12-emi", "Faraday, Lenz, self and mutual induction. Lenz is a sentence you can say without the formula.", "phy12-mag", "Field direction first. Induced current opposes the change, not the field.", "Needs magnetism. Alternating current is this, repeating.", "eng11-world", "The World is too Much with Us. What has been given away. Six lines.", "Ten EMI MCQs."],
  ["phy12-ac", "Peak and rms, reactance, LCR, resonance, power factor, transformer. Phasor as a picture, not a derivation.", "phy12-emi", "One mutual-induction idea restated, then the rms values.", "After EMI. The transformer is Faraday with a job.", "cet-simplify", "A short arithmetic set, fifteen. Keep the evening light.", "Twelve AC MCQs."],
  ["phy12-emw", "Displacement current as an idea, transverse EM waves, the spectrum and one use of each band.", "phy11-waves", "Standing waves were mechanical. Today the wave needs no medium. Write that difference in three lines.", "Class 11 waves plus EMI. Wave optics later is the light slice of this spectrum.", "eng11-phone", "Telephone Conversation. Where the prejudice sits in the line breaks. A short note.", "Ten EM-wave MCQs."],
  ["chem12-df", "Transition metals: configuration, colour, catalytic behaviour, the lanthanoids in one clean comparison.", "chem11-period", "The periodic trends page, open beside you. d-block is those trends with a half-filled d shell.", "Periodicity was the gate. Coordination compounds need this and hybridisation.", "pe11-4", "CWSN: what inclusion means in a PE class. Disability etiquette in your own words.", "Twelve d-block MCQs.", "", "pe12-4"],

  ["phy12-ray", "Mirrors, refraction, TIR, lens formula, lens maker, prism, microscope and telescope magnifying power.", "math11-lines", "Sign convention is a number line. Ten minutes on signs, then the optics.", "Straight lines and the idea of a focus. Wave optics is next, and it is a different model — don’t mix them today.", "eng11-hawk", "Hawk Roosting. Who has the power in the voice. Five lines.", "Fifteen ray-optics MCQs."],
  ["phy12-wave", "Huygens, YDSE fringe width, single-slit diffraction at the idea level. One labelled fringe diagram.", "phy11-waves", "Interference you already met as sound. Today the source is light and the sources have to be coherent.", "Needs Class 11 waves and yesterday’s ray model, so you can say what each one explains.", "eng11-nightingale", "Ode to a Nightingale. The turn in the poem. Mark it. Don’t summarise all eight stanzas.", "Ten wave-optics MCQs."],
  ["chem12-coord", "Werner, naming, isomerism, VBT or crystal field at the level of colour and pairing. One name, fully parsed.", "chem11-bond", "Hybridisation revision, ten minutes, then a complex. The new word is ligand.", "Bonding plus the d-block. This is why those two chapters were not allowed to swap places.", "pe12-2", "Women in sport, female athlete triad, postural deformities and one correction each.", "Twelve coordination MCQs."],
  ["chem12-halo", "Nature of C–X, SN1 and SN2, elimination, the polyhalogen compounds worth naming.", "chem11-hydro", "Your hydrocarbon map, open. Haloalkanes are those molecules with one bond changed.", "After GOC and hydrocarbons. Alcohols are the next functional group, not a new subject.", "eng12-grammar", "Eight sentence transformations. This is the Class 12 elective grammar paper, and it matches CET voice work.", "Fifteen haloalkane MCQs."],
  ["chem12-alc", "Alcohols against phenols against ethers. One chemical test that tells them apart, written as steps.", "chem12-halo", "How you would make the alcohol from the halide. One route.", "The functional-group ladder: halide, then oxygen, then carbonyl, then nitrogen.", "pe12-3", "One asana for a lifestyle condition, performed in the sport block. Contraindication included.", "Twelve alcohol and phenol MCQs."],
  ["math12-rel", "Reflexive, symmetric, transitive, equivalence. One-one and onto, with one example and one counterexample each.", "math11-rel", "Domain and range, restated in four lines, then the new words.", "Class 11 relations were the picture. Today is the logic. Inverse trig sits in the same unit, so it is the linked work.", "math12-invtrig", "Principal values only. Draw y = sin⁻¹x and say the range out loud.", "Ten relation proofs in short form, plus eight inverse-trig values.", "Continuity will differentiate these inverse functions. Not yet."],

  ["math12-mat", "Types, addition, multiplication, transpose, symmetric and skew. One 2×2 product where AB is not BA.", "math12-mat", "CET matrices. Order and the zero-product trap. Twelve.", "Determinants need this language. Nothing in physics is waiting on it, so it can sit here, before calculus thickens.", "cet-ranking", "A second pass at ranking puzzles, faster than the first time.", "Twelve matrix MCQs."],
  ["math12-det", "Determinant up to 3×3, adjoint, inverse, one system of equations solved by inverse.", "math12-mat", "If multiplication is still shaky, two products, then the determinant. Inverse uses both.", "After matrices. Area of a triangle by determinant is a gift question. Learn it.", "eng11-moth", "Pappachi’s Moth. The insect and the pride. What the title is doing.", "Ten determinant questions."],
  ["math12-cont", "Continuity, differentiability, chain rule, implicit, log differentiation, second derivative. Inverse trig derivatives.", "math11-lim", "One limit from Class 11, redone, then the new definition. The habit is old.", "Needs Class 11 limits and the inverse trig you just met. Applications of derivatives are useless before this.", "eng11-continent", "The Third and Final Continent. The ending, and what ‘splendid’ is doing. Half a page.", "Twelve continuity MCQs."],
  ["math12-aod", "Increasing and decreasing, maxima and minima, one rate of change from a real situation.", "math12-cont", "Derivative rules, ten minutes, then a max-min. Don’t start from the word problem.", "After differentiability. This is where calculus starts earning marks. The unit is 35.", "cet-verbal", "Statement and assumption, plus a few non-verbal items. Twenty minutes.", "Ten maxima questions. Show the sign of the derivative."],
  ["chem12-carbonyl", "Preparation and the named reactions you must be able to complete. A map: what a carbonyl turns into.", "chem12-alc", "How an alcohol becomes a carbonyl. One oxidation, written.", "After alcohols. Amines are next. The map should already show the arrow.", "eng11-goodbook", "What is a Good Book? One paragraph in your own voice answering the title. Then the essay’s answer.", "Fifteen carbonyl MCQs."],
  ["chem12-amines", "Basic strength, preparation, diazonium and two synthetic uses. One distinction test.", "chem12-carbonyl", "A carbonyl-to-amine route, one example, then the new reactions.", "Last step of the functional-group ladder before biomolecules.", "pe12-5", "Macros, a competition meal, and one myth about supplements. Sports nutrition, one page.", "Twelve amine MCQs."],

  ["math12-int", "Integration as the reverse of differentiation. Substitution, parts, and the standard forms on the syllabus card.", "math12-aod", "Differentiate your answer every time until the habit is automatic. That is the check.", "Reverse of the derivative you already trust. Definite integrals are the next day, not a different art.", "cet-puzzle", "One hard puzzle set, twenty minutes. Leave it if it stalls. Guessing costs 0.24.", "Eight integrals, fully written."],
  ["math12-int", "Definite integrals: the fundamental theorem, and the properties that flip limits and use symmetry.", "math12-int", "Five indefinite integrals you would still hesitate on, then the definite properties.", "Same chapter, second sitting. The properties are where the 35-mark unit hides easy marks.", "eng11-passions", "My Three Passions. What Russell wants a life to hold. Tie one passion to a sentence of your own.", "Ten definite-integral MCQs."],
  ["math12-area", "Area under lines, circles, parabolas, ellipses. Sketch first. The integral is the second move.", "math11-conic", "Write the standard equations of the four curves from memory, then find one area.", "Conics were learned before integrals existed so that today is not two new things.", "eng11-creativity", "Patterns of Creativity. One idea from the essay, restated without the author’s words.", "Eight area questions."],
  ["phy12-dual", "Photoelectric effect, Einstein’s equation, graphs of stopping potential, de Broglie.", "phy12-emw", "Energy of a wave versus energy of a photon. Three lines on the difference.", "Needs the EM spectrum and the energy chapters. Particles-as-waves is the door to Bohr.", "cet-current", "Ten current-affairs points, including one sports and one maritime if you can find them. Written.", "Twelve photoelectric MCQs. Read the graph axis before the question."],
  ["phy12-atoms", "Rutherford, Bohr radii, energy, the hydrogen spectrum qualitatively.", "chem11-atom", "Your Class 11 orbital page, open. Today’s Bohr model is the earlier picture, used for spectra. Say what the quantum model added.", "The loop closes: chemistry’s atom chapter, then dual nature, then this.", "eng11-thestory", "The Story. What the essay claims a story can do that an argument cannot.", "Ten Bohr numericals. Radius and energy only."],
  ["phy12-nuclei", "Mass defect, binding energy per nucleon, the curve, fission and fusion as sentences plus one sum.", "phy12-atoms", "The nucleus is not an orbit. Two lines on what changed, then the new sums.", "After atoms. Semiconductors are a different branch — they wait one beat.", "cet-geo", "Deserts, lakes, the solar system. A quick second pass. Fifteen facts.", "Ten nuclei MCQs."],

  ["math12-de", "Order, degree, separation of variables, homogeneous, linear dy/dx + Py = Q.", "math12-int", "You will integrate once per equation. If the integral stalls, that is the gap, not the differential equation.", "Needs both the derivative and the integral. This is the last big calculus chapter.", "eng11-bridges", "Bridges. What is being joined. A short personal response, which is what the elective rewards.", "Eight differential equations."],
  ["math12-vec", "Direction cosines, dot product, cross product, a line divided in a ratio. One geometric reading of each product.", "phy11-plane", "Class 11 components, ten minutes. Then the formal dot and cross. You have used this since projectiles.", "Physics vectors were the tool. This is the same tool, examined from the maths paper.", "cet-mensuration", "Heights, areas, a sine rule memory. Fifteen, light.", "Twelve vector MCQs."],
  ["math12-3d", "Equation of a line, angle between lines, skew lines, shortest distance.", "math12-vec", "Direction ratios from yesterday, then the line. Don’t start from the formula of distance.", "Needs vectors and the Class 11 distance formula. This is the 14-mark unit’s second half.", "eng11-tribal", "Tribal Verse. What the essay wants you to stop assuming about the poems. Half a page.", "Ten 3D-geometry questions."],
  ["math12-lpp", "Constraints, objective, feasible region, corner points. One problem drawn to scale.", "math11-ineq", "Two inequalities on a number line, then the two-variable picture. The new idea is the objective function.", "Linear inequalities were parked beside straight lines for this day.", "cet-voice", "Another fifteen transformations. Speed is the point the second time.", "One full LPP, then five MCQs on the region."],
  ["math12-prob", "Conditional probability, independence, total probability, Bayes. One Bayes story, fully written.", "math11-prob", "‘And’ and ‘or’ from Class 11, restated, then the condition.", "Needs Class 11 probability and permutations. This is the end of the maths keel.", "cet-verbal", "Non-verbal plus a truth-of-statement set. Twenty.", "Eight Bayes questions. Write the tree."],
  ["chem12-bio", "Carbohydrates, proteins, enzymes, vitamins, nucleic acids, hormones. Structures of glucose and a peptide link.", "chem12-amines", "Functional groups you already know, now inside a molecule with a job in the body.", "After the organic ladder. Biomolecules are those groups, named for what they do.", "pe12-6", "Test and measurement in Class 12: SAI tests, fitness batteries. One protocol written as steps.", "Twelve biomolecule MCQs."],

  ["phy12-semi", "Bands, intrinsic and extrinsic, p–n junction, forward and reverse, the diode as a rectifier.", "phy12-current", "One Ohm’s-law circuit, then the diode curve. The new idea is the junction, not the current.", "Needs current electricity and the atom. This is the last physics chapter. The keel of physics is complete.", "cet-polity", "Age limits and tenure: president, PM, judges, MLA. A table you write yourself.", "Twelve semiconductor MCQs."],
  ["chem12-surface", "Adsorption against absorption, lyophilic and lyophobic, one emulsion. Formative, so keep it to forty minutes.", "chem12-poly", "Homopolymer, copolymer, two examples. Then everyday-life chemicals: two drugs, one food additive.", "These are in the book and in some CET sets, and they are not in the board theory total. Do them once, properly, and leave them.", "chem12-life", "A one-page list: antiseptic, antibiotic, antacid, antihistamine, preservative. Names, not paragraphs.", "A mixed fifteen from surface, polymers, and everyday life.", "", "chem12-extract|chem11-sp"],
  ["phy11-laws", "Second pass, mechanics only. One free-body, one energy, one rotation. No new chapter.", "phy11-grav", "Satellites and escape speed, five numericals, old chapters.", "The first pass is done for Class 11 mechanics. CET marks come from doing them again, colder.", "eng11-arms", "Arms and the Man, Act 1. Who is performing heroism. A cast list with one adjective each.", "Twenty-five mechanics MCQs, timed like the real paper: about 22 minutes.", "", "phy11-work|phy11-rot"],
  ["phy12-current", "Second pass, electricity. One Kirchhoff, one capacitor network, one magnetic force.", "phy12-dual", "Five photoelectric graphs. Read the axis first.", "Same rule as mechanics. The chapters are old. The speed is new.", "eng11-arms", "Acts 2 and 3. Bluntschli against Sergius. One paragraph a board examiner would recognise as yours.", "Twenty-five MCQs across electrostatics, current, and modern physics."],
  ["eng11-coming", "The poems still thin: read The Peacock again only if the note is vague. Today is a poetry method, used on one poem.", "eng11-sonnet", "Reference to context: write the annotation the way the paper asks, ten marks worth of thinking in miniature.", "English elective pays for a point of view with a line from the text, not for a summary.", "pe12-1", "Fixtures: knockout with byes, and a league table. Draw one of each. This is the five-mark unit people drop.", "One unseen paragraph, twelve questions, CET or elective style. Time it."],
  ["eng11-bridges", "Essays you have met, now as a set. What each essay argues, in one sentence you could defend.", "eng11-goodbook", "A 120-word article on a real issue. Count the words. The paper wants 120 to 150.", "Creative writing is 15 marks in Class 11 and 20 in Class 12. It is not ‘the easy section’ if you have never timed it.", "pe12-8", "Biomechanics: projectile, friction, spin. You already did the physics. Today, name them inside a sport.", "A speech, 120 words, spoken once aloud."],

  ["eng11-oldman", "The Old Man and the Sea, first half. Santiago and the boy. Track the pride, not just the fish.", "eng11-oldman", "One passage. What the sentence rhythm is doing. Annotation, not plot.", "The novel is 10 marks and it is also your Sunday reading. Today you only pin the first half down.", "pe12-9", "Class 12 psychology of sport, set beside the Class 11 chapter. What is new is anxiety, goal setting, and aggression in a match.", "Fifteen CET English questions: vocabulary in context."],
  ["eng11-oldman", "Second half, and the ending. What is left of the marlin, and what Santiago thinks that means.", "eng11-seminar", "A five-minute seminar shape: claim, two lines from the book, one objection you answer.", "Seminar is 20 marks. The shape matters more than the slides.", "pe12-10", "Training cycles, talent identification, warming up. Builds on Class 11 training and doping.", "Write the seminar opening and time it."],
  ["eng12-dreams", "I Sell my Dreams. What is being sold. A character note.", "eng12-eveline", "Eveline. Why she does not move. Use the text, not a life lesson.", "Class 12 elective stories are fewer and they are read more closely. Three of them, not a sprint through a book.", "eng12-wedding", "A Wedding in Brownsville. The ending. Half a page.", "One poetry MCQ set, eight questions, as in the elective paper."],
  ["eng12-shadow", "A Lecture Upon the Shadow. The conceit, in plain speech, then two lines you would quote.", "eng12-milton", "One Milton poem from the book. Note the syntax, not a biography of Milton.", "Poetry in Class 12 is the same muscle as Class 11, on harder sentences.", "eng12-blake", "One Blake poem. Innocence or experience, said with a quotation.", "Close reading: eight lines, five annotations."],
  ["eng12-kubla", "Kubla Khan. Pleasure-dome, the ending, what the poem claims about making.", "eng12-trees", "Trees. A short comparison of image with Kubla, not a forced one.", "Keep the poetry set together so Class 12 literature is not twelve lonely evenings.", "eng12-swans", "The Wild Swans at Coole. Time, in the poem. Four lines.", "A 120-word discursive paragraph."],
  ["eng12-time", "Time and Time Again. What repeats. One personal response, which the long answer wants.", "eng12-freedom", "Freedom. The argument, in five sentences, each tied to a line.", "Nonfiction is the other half of Kaleidoscope. Treat it as argument, not as ‘passage’.", "cet-current", "Current affairs, ten points. Sports included.", "CET English: one 150-word precis-style summary of a paragraph you choose."],

  ["eng12-wall", "The Mark on the Wall. How the mind moves. Don’t try to make it a moral.", "eng12-film", "Film-making. One idea you could use in a seminar.", "These essays reward a reader who can follow a digression without getting lost. Practise that.", "eng12-novelmatters", "Why the Novel Matters. Put it beside The Old Man and the Sea in two sentences.", "A case-based CET or elective set: a chart, five questions."],
  ["eng12-argument", "The Argumentative Indian. One argument Sen makes, in your words, with his example.", "eng12-chandalika", "Chandalika. Prakriti, the monk, what the play refuses to sentimentalise. A character note.", "Drama in Class 12 is one play. Know it the way you know Arms and the Man.", "eng12-grammar", "A second grammar set, eight transformations, timed.", "Write a 150-word speech you could also use as a seminar opening."],
  ["eng12-fiction", "Start the novel you chose: A Tiger for Malgudi or The Financial Expert. First third. A cast list.", "eng12-fiction", "One relationship, tracked. The paper asks for interpersonal relationships, not themes in the abstract.", "You only get one novel. Switching later costs the 10 marks.", "cet-analogy", "Analogies again, at speed. Twenty.", "English section strategy: attempt the sure twelve, leave the pretty guesses."],
  ["eng12-fiction", "Middle and end. The decision the book makes. One long-answer plan: introduction, two scenes, a line of your own.", "eng12-seminar", "Seminar script, five minutes, plus three questions you hope they ask and your answers.", "This is the 20-mark speaking task. Do it aloud. The written plan is not the seminar.", "pe12-1", "Redraw a fixture from memory. Seeding and byes.", "Time the seminar once."],
  ["eng11-arms", "If the play is still fuzzy: one scene, spoken. Otherwise this hour is a board long answer, planned and written.", "phy11-units", "A cold mixed set is not today’s job. Today, one English answer in full, 120 words, no plan beside you.", "From here the newness stops. The keel is built. What is left is speed and honesty about gaps.", "cet-idiom", "Idioms you still hesitate on. Fifteen, in sentences.", "One full English long answer, timed."],
  ["math12-cont", "Calculus repair. The 35-mark unit. One continuity proof, one max-min, one integral, one area sketch.", "math12-int", "Only the standard integrals you cannot start. Make a card of eight.", "Boards and the CET both live here. An hour on calculus beats an hour of new GK.", "cet-syn", "A short vocabulary card. Thirty pairs.", "Twenty calculus MCQs. Leave the ones that need a second sheet of algebra."],

  ["chem12-carbonyl", "Organic repair. A conversion chain: hydrocarbon to halide to alcohol to carbonyl to amine. One chain, three examples.", "chem11-org", "Nomenclature of the products, because a right reagent with a wrong name is still wrong.", "Named reactions are a list. Conversions are how the paper asks them.", "chem12-bio", "Glucose and the peptide bond, redrawn from memory.", "Twenty organic MCQs."],
  ["phy12-charges", "Electrostatics and current, board style. One Gauss application, one capacitor, one Kirchhoff, written as if for marks.", "phy12-ac", "One LCR at resonance. Power factor in a sentence.", "These are the heavy physics units. Modern physics is shorter and you already passed it once.", "phy12-semi", "The rectifier diagram, redrawn. Label the diode.", "Twenty-five physics MCQs across the heavy units. About twenty-two minutes."],
  ["math11-prob", "A mixed maths hour: one Class 11 question and one Class 12 question from the same idea. Probability, then Bayes.", "math12-prob", "One Bayes tree, fully labelled.", "Same concept, two years. This is the whole point of the keel.", "cet-series", "Series at speed. Twenty.", "Fifteen maths MCQs, mixed years."],
  ["chem12-electro", "Nernst, one cell, one order-of-reaction graph. Physical chemistry numericals, not theory paragraphs.", "chem12-kin", "Half-life and the Arrhenius sentence.", "CET chemistry is only 20 marks, so it must be clean. These two chapters are where numericals hide.", "cet-current", "Current affairs, ten lines.", "The full chemistry section: 20 questions, 18 minutes."],
  ["phy11-line", "Full physics section strategy. Do 25 questions in 22 minutes from chapters you have ticked. Then stop and sort the misses by chapter.", "phy12-ray", "Any miss in optics gets one diagram tonight, not a reread of the chapter.", "A miss is a chapter, not a mood. Write the chapter name beside the question.", "eng11-seminar", "If your seminar is still a topic without a text, pick the text tonight in ten minutes.", "Log the score: right, wrong, blank."],
  ["math12-vec", "Maths section slice: 25 questions, 35 minutes. Vectors, 3D, calculus, and one Class 11 chapter you dislike.", "math11-conic", "If a conic showed up and stalled, write the four equations again.", "Negative marking: a blank is 0. A wrong is −0.24. Pride is expensive.", "cet-geo", "Ports and straits, one last pass. You are aiming at a life that uses them.", "Log the score."],

  ["cet-pos", "English plus aptitude slice. Forty minutes. Vocabulary, one passage, and twenty aptitude items.", "cet-verbal", "The aptitude items you guessed: redo them with the rule written.", "CET English is 40 marks, larger than chemistry. It is not the section you ‘will see’.", "pe11-3", "The asanas, done, not read.", "Log right, wrong, and blank separately."],
  ["cet-polity", "GK slice. Geography, polity, static, and ten current points. Twenty-five questions if you have a bank. Otherwise write twenty you could be asked.", "cet-current", "One news story in six lines, the way a one-mark question would ask it.", "GK is 20 marks and it moves. The static half should already be boring.", "prac-phy", "Physics practical: one experiment’s aim, diagram, observation, result, and the viva question you fear.", "Twenty GK questions."],
  ["prac-chem", "Chemistry practical hour. Titration steps, or a salt’s preliminary tests. Write them as a procedure you could follow gloved.", "prac-pe", "PE practical: the test, the fitness component, the asana. The 30 marks are not theoretical.", "School practicals are 30 each. A topper who ignores them is leaving a third of the paper.", "cet-arith", "Ten percentage questions, so the hand stays fast.", "No new theory today."],
  ["phy12-nuclei", "Open day for the worst chapter on your tick list. One chapter. Past papers of that chapter only.", "math12-aod", "If the worst chapter is not maths, still do five maxima. The 35 marks forgive no one.", "From here, every study day is a gap, not a tour. The path order still holds when two gaps compete: do the earlier gate first.", "eng12-fiction", "Ten pages of the novel, or one board paragraph.", "Fifteen MCQs from the weak chapter. Log them."],
  ["math12-lpp", "A board-style paper slice: 90 minutes, any one subject you choose, closed book. Then 20 minutes of marking against a key or against your own notes.", "chem12-coord", "If you chose maths or physics, still name one complex before dinner. Coordination is a seven-mark gift.", "One closed-book sitting teaches more than three open-book evenings.", "pe12-8", "One biomechanics diagram from memory.", "Mark it honestly."],
  ["phy11-waves", "End of the first pass. Look at the syllabus ticks. The unticked chapters are next week’s only job, in the original order, not in the order of your anxiety.", "cet-current", "Write the date and five things that happened in the news. The CET will not ask your feelings about them.", "If every chapter is ticked, the second pass has already started: same keel, only mistakes.", "eng11-oldman", "Reread the last three pages of the novel you are in.", "A 40-question mixed set. Then the evening is games, as planned."],
];

export const sessions: Session[] = raw.map((row, i) => {
  const covers = row[9]
    ? row[9]
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean)
    : undefined;
  return {
    id: `s${String(i + 1).padStart(2, "0")}`,
    week: Math.floor(i / 6) + 1,
    primary: row[0],
    primaryFocus: row[1],
    linked: row[2],
    linkedFocus: row[3],
    because: row[4],
    evening: row[5],
    eveningFocus: row[6],
    drill: row[7],
    later: row[8] || undefined,
    covers,
  };
});

export function phaseForWeek(week: number): { name: string; line: string } {
  if (week <= 1) {
    return {
      name: "Measure",
      line: "Units, the mole, sets, the atom, trig. Nothing clever until the language is yours.",
    };
  }
  if (week <= 3) {
    return {
      name: "Move",
      line: "Derivatives, then motion, then force. Carbon starts only after the atom is sitting still.",
    };
  }
  if (week <= 5) {
    return {
      name: "Heat",
      line: "Rotation, gravity, solids, fluids. Chemistry and physics thermodynamics share one vocabulary.",
    };
  }
  if (week === 6) {
    return {
      name: "Wave",
      line: "Oscillations after trig. Conics and 3D now, because area and lines in Class 12 will ask for them.",
    };
  }
  if (week === 7) {
    return {
      name: "Charge",
      line: "Class 12 begins. Electrostatics uses Class 11 vectors. Electrochemistry uses redox, not hope.",
    };
  }
  if (week === 8) {
    return {
      name: "Field",
      line: "Current, then magnetism, then induction, then AC. The d-block waits on periodicity.",
    };
  }
  if (week === 9) {
    return {
      name: "Light",
      line: "Ray optics, then wave optics. Coordination after bonding. The organic ladder steps one group at a time.",
    };
  }
  if (week <= 11) {
    return {
      name: "Climb",
      line: "Calculus in order: continuity, maxima, integrals, area. Atoms in physics only after dual nature and Class 11 chemistry.",
    };
  }
  if (week === 12) {
    return {
      name: "Space",
      line: "Differential equations, vectors, 3D, Bayes. Biomolecules after the functional groups. Physics ends at the diode.",
    };
  }
  if (week <= 14) {
    return {
      name: "Voice",
      line: "The books, the plays, the seminar. PE’s heavier units, now that the body chapters in physics exist.",
    };
  }
  return {
    name: "Trial",
    line: "No new tour of the syllabus. Gaps, closed-book sittings, and the −0.24.",
  };
}

export const keels: { title: string; steps: string[] }[] = [
  {
    title: "Motion",
    steps: ["Limits and derivatives", "Straight-line graphs", "Plane and projectile", "Laws", "Work and energy", "CET mechanics sets"],
  },
  {
    title: "Charge",
    steps: ["Vectors from Class 11", "Charges and Gauss", "Potential and capacitors", "Current and Kirchhoff", "Force on a moving charge", "Induction and AC"],
  },
  {
    title: "Carbon",
    steps: ["Atom", "Bonding", "Organic basics", "Hydrocarbons", "Haloalkanes", "Alcohols", "Carbonyls", "Amines", "Biomolecules"],
  },
  {
    title: "The cell",
    steps: ["Redox", "Equilibrium and Gibbs", "Current electricity", "Electrochemistry and Nernst"],
  },
  {
    title: "Light",
    steps: ["Trigonometry", "Oscillations", "Waves", "Electromagnetic waves", "Ray optics", "Wave optics"],
  },
  {
    title: "Calculus",
    steps: ["Class 11 limits", "Inverse trig", "Continuity", "Maxima", "Integrals", "Area, after conics", "Differential equations"],
  },
];
