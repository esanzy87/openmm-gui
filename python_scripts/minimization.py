import argparse
import os
from simtk import unit
from simtk.openmm import app, CustomExternalForce, LangevinIntegrator, Platform


NANOMETER = unit.nano * unit.meter
PICOSECOND = unit.pico * unit.second


def minimization(prmtop_file_path, inpcrd_file_path, maxcyc, restraint_weight=None, ntb=1):
    prmtop = app.AmberPrmtopFile(prmtop_file_path)
    inpcrd = app.AmberInpcrdFile(inpcrd_file_path)

    system = prmtop.createSystem(
        nonbondedMethod=app.PME,
        nonbondedCutoff=1.0 * NANOMETER,
        constraints=app.HBonds,
        rigidWater=True,
    )

    integrator = LangevinIntegrator(
        300.0 * unit.kelvin,
        1.0 / PICOSECOND,
        0.002 * PICOSECOND,
    )
    integrator.setConstraintTolerance(0.00001)

    platform = None
    for i in reversed(range(Platform.getNumPlatforms())):
        platform = Platform.getPlatform(i)
        if platform.getName() == 'CUDA':
            break
        elif platform.getName() == 'OpenCL':
            break
        elif platform.getName() == 'CPU':
            break
    
    simulation = app.Simulation(prmtop.topology, system, integrator, platform)
    simulation.context.setPositions(inpcrd.positions)
    
    # minimization 1
    simulation.minimizeEnergy(maxIterations=1000)
    
    # minimization 2 with restraint weight
    _weight = 10.0 * 418.4  # kcal/mol/A^2 to kJ/mol/nm^2
    force = CustomExternalForce('k*(periodicdistance(x,y,z,x0,y0,z0)^2)')
    force.addGlobalParameter('k', _weight)
    force.addPerParticleParameter('x0')
    force.addPerParticleParameter('y0')
    force.addPerParticleParameter('z0')
    for i, atom in enumerate(prmtop.topology.atoms()):
        if atom.residue.name not in ('HOH', 'NA', 'CL'):
            force.addParticle(i, inpcrd.positions[i])
    simulation.system.addForce(force)
    simulation.minimizeEnergy(maxIterations=10000)
    simulation.saveState('minimization.xml')
    
    
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('word_dir')
    args = parser.parse_args()
    
    cwd = os.getcwd()
    try:
        os.chdir(args.work_dir)
        minimization('model.prmtop', 'model.inpcrd', 1000)
    finally:
        os.chdir(cwd)
