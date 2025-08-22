using EmployeeApi.Data;
using EmployeeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Services
{
    public class EmployeeRepository
    {
        private readonly EmployeeDbContext _context;

        public EmployeeRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAll() => await _context.Employees.ToListAsync();

        public async Task<Employee?> Get(int id) => await _context.Employees.FindAsync(id);

        public async Task<Employee> Add(Employee emp)
        {
            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();
            return emp;
        }

        public async Task<bool> Update(int id, Employee updated)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return false;

            emp.Name = updated.Name;
            emp.Email = updated.Email;
            emp.JobTitle = updated.JobTitle;
            emp.Department = updated.Department;
            emp.Phone = updated.Phone;
            emp.Salary = updated.Salary;
            emp.DateOfJoining = updated.DateOfJoining;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null) return false;

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
