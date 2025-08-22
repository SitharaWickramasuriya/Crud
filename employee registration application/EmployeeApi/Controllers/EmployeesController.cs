using Microsoft.AspNetCore.Mvc;
using EmployeeApi.Models;
using EmployeeApi.Services;

namespace EmployeeApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeRepository _repo;

        public EmployeesController(EmployeeRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAll() => Ok(await _repo.GetAll());

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var emp = await _repo.Get(id);
            return emp == null ? NotFound() : Ok(emp);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> Create(Employee emp)
        {
            var created = await _repo.Add(emp);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Employee emp)
        {
            return await _repo.Update(id, emp) ? Ok(emp) : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return await _repo.Delete(id) ? NoContent() : NotFound();
        }
    }
}
